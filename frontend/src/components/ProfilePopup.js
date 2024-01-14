import React, { useState, useEffect } from 'react';
import './ProfilePopup.css';
import axios from 'axios';

const ProfilePopup = ({ onClose, onUserTypeChange, user_id }) => {
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:9000/api/user/${user_id}`)
    .then(response => {
      console.log('Response Data:', response.data);
      const user = response.data;
      setUserName(user.user_name || 'N/A');
      setUserType(user.user_type || 'N/A');
      setUserEmail(user.email || 'N/A');
    })
    .catch(error => {
      console.error('Erroare la preluarea datelor despre user:', error);
    });
}, [user_id]);

  const handleLogout = () => {
    axios.post('http://localhost:9000/api/logout', { user_id: user_id })
      .then(response => {
        console.log('Logout successful:', response.data.message);
        onClose(); 
        onUserTypeChange('home'); 
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <div className="profile-popup" style={{ top: `80px` }}>
      <div className="popup-content">
        <div className="user-info">
          <p>{userName}</p>
          <p>{userType}</p>
          <p>{userEmail}</p>
        </div>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    </div>
  );
};

export default ProfilePopup;