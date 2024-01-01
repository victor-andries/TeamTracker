import React, { useState } from 'react';
import './LoginPopup.css';
import AdminPage from './AdminPage';

const LoginPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleLogin = () => {
    fetch('http://localhost:9000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
      .then((data) => {
        setUserType(data.userType);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="login-popup">
      {userType === 'admin' ? (
        <AdminPage onClose={onClose} />
      ) : (
        <div className="popup-content">
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button onClick={handleLogin}>Login</button>
          <p className='pLoginPopup' onClick={onClose}>Cancel</p>
        </div>
      )};
    </div>
  );
};

export default LoginPopup;