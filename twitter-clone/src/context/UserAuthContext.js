import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  sendEmailNotification,
} from "./yourEmailService";
const auth = getAuth();

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  // const [loginAttempts, setLoginAttempts] = useState(0);
  // const [loginAttempts, setLoginAttempts] = useState(parseInt(localStorage.getItem('loginAttempts')) || 0);

  function logIn(email, password , loginAttempts) {
    if (loginAttempts > 4) {
      alert("Your account is blocked for 1 hour.");
      setTimeout(() => {
        setLoginAttempts(0);
        localStorage.setItem('loginAttempts', 0);
      }, 360000);
      return;
    }
    else{
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoginAttempts(0);
        localStorage.setItem('loginAttempts', 0);
      })
      .catch((error) => {
        setLoginAttempts(loginAttempts + 1);
        localStorage.setItem('loginAttempts', loginAttempts + 1);
        console.log("Login attempts", loginAttempts);
        if (2 <= loginAttempts && loginAttempts < 4) {
          sendEmailNotification(email, {
            message: ` You have done ${
              loginAttempts + 1
            } consecutive failed login attempts with an incorrect password`,
          });
          alert(
            ` You have done ${
              loginAttempts + 1
            } consecutive failed login attempts with an incorrect password`
          );
        } else if (loginAttempts >= 4) {
          sendEmailNotification(email, {
            message: ` You have done maximum failed attempts. Your account has been blocked for 1 hour.`,
          });
          alert(
            "You have done maximum failed attempts. Your account has been blocked for 1 hour."
          );
          setTimeout(() => {
            setLoginAttempts(0);
            localStorage.setItem('loginAttempts', 0);
          }, 360000);
        }
        throw error;
      });
  }
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
