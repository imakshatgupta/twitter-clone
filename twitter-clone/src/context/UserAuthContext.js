import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

import { auth } from "./firebase";

import sendEmailNotification from "./yourEmailService"; 
// import blockAccount from "./yourEmailService"; 
// import unblockAccount from "./yourEmailService"; 
// import { sendEmailNotification, blockAccount, unblockAccount } from "./yourEmailService"; 


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [loginAttempts, setLoginAttempts] = useState(0);


    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
        
        .then(() => {
            // Reset login attempts if login is successful
            setLoginAttempts(0);
        })
        .catch((error) => {
            // Handle failed login attempts
            setLoginAttempts(loginAttempts + 1);
            if (loginAttempts >= 2) {
                console.log("Login attempts");
                // Send email notification after 3 consecutive failed attempts
                sendEmailNotification(email);
            }
            // if (loginAttempts >= 4) {
            //     // Block account and send notification after 5 failed attempts
            //     blockAccount(email);
            //     sendEmailNotification(email, "Account Blocked: Multiple Failed Login Attempts");
            //     // Unblock account after one hour
            //     setTimeout(() => {
                //         unblockAccount(email);
                //     }, 3600000); // 1 hour in milliseconds
                // }
                throw error;

        });
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
            console.log("Auth", currentuser);
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