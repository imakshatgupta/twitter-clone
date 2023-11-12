import React, { useState, useEffect } from 'react';
import { useUserAuth } from "../../../context/UserAuthContext";
import { useParams } from 'react-router-dom';
import '../../pages.css';
import MainProfile from './MainProfile';

function Profile() {
    const { user } = useUserAuth();
  const email = user?.email;
  const [aplan, setAplan] = React.useState("");
  // const [plan, setPlan] = React.useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/loggedInUser?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setAplan(data[0]?.username);
      });
  }, [aplan]);



  const { userId } = useParams();
  
  const [ouser, setOuser] = useState("");

//   useEffect(() => {
//     fetch(`/user/${userId}`)
//     .then((response) => response.json())

//       .then((data) => {
//         console.log("data");
//         console.log(data);  
//         setUser(data);
//         console.log("user");
//       })
//       .catch((error) => console.error('Error fetching user data:', error));
//   }, [userId]);

useEffect(() => {
    fetch(`http://localhost:5000/profile?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setOuser(data[0]);
      });
  }, [userId]);


  return (
//     <div className='profilePage'>
//     {user?.privacy === "public" ? (
//       <MainProfile user={user} />
//     ) : (
//       <h2>The account is Private</h2>
//     )}
//   </div>
 <div className='profilePage'>
{aplan.includes(ouser?.blockedUsername) ? (
  <h2>This user's profile is private</h2>
) : (
  <div>
    {ouser?.privacy === 'public' ? (
      <MainProfile user={ouser} />
    ) : (
      <h2>This user's profile is private</h2>
    )}
  </div>
)}
</div> 
  );
}

export default Profile;
