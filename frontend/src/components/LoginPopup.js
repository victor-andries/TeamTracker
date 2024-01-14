import React, { useState } from 'react';
import './LoginPopup.css';
import axios from 'axios';

const LoginPopup = ({ onClose , onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:9000/api/login', { email, password })
    .then((response) => {
      const user_type = response.data.user_type;
      const user_id = response.data.user_id;
      console.log('User type:', user_type);
      console.log('User ID:', user_id);
      onLoginSuccess(user_type, user_id);
      onClose();
    })
    .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="login-popup">
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
    </div>
  );
};

export default LoginPopup;