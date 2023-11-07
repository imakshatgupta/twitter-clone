import React, { useState } from 'react';
import './Badge.css';

const Badge = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [profession, setProfession] = useState('');
    const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  console.log('Verification request submitted:', { fullName, username, profession });
  };

  return (
    <div className="badge-container">
      <h2>Apply for Verification Badge</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Instagram Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profession">Profession:</label>
          <input
            type="text"
            id="profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
            <label htmlFor="profession">Upload your ID:</label>
            <input
                type="file"
                id="profession"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
            />
        </div>
        <p>
         NOTE : You will get a verification badge within 1 hour after submitting the request.
        </p>
        <br></br>
        <button className="apply-button" type="submit">Pay 299 RS.</button>
      </form>
    </div>
  );
};

export default Badge;
