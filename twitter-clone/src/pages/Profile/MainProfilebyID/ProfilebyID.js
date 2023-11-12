import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../pages.css';
import MainProfile from './MainProfile';

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState("");

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




  return (
    <div className='profilePage'>
    {user?.privacy === "public" ? (
      <MainProfile user={user} />
    ) : (
      <h2>The account is Private</h2>
    )}
  </div>
  
  );
}

export default Profile;
