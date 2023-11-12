import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../pages.css';
import MainProfile from './MainProfile';
import useLoggedInUser from '../../../hooks/useLoggedInUser';

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState("");
    const [loggedInUser] = useLoggedInUser();


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
        setUser(data[0]);
      });
  }, [userId]);


console.log(loggedInUser);

  return (
//     <div className='profilePage'>
//     {user?.privacy === "public" ? (
//       <MainProfile user={user} />
//     ) : (
//       <h2>The account is Private</h2>
//     )}
//   </div>
<div className='profilePage'>
{loggedInUser?.username.includes(user?.blockedUsername) ? (
  <div>This user's profile is private</div>
) : (
  <div>
    {user?.privacy === 'public' ? (
      <MainProfile user={loggedInUser} />
    ) : (
      <div>Loading...</div>
    )}
  </div>
)}
</div>
  );
}

export default Profile;
