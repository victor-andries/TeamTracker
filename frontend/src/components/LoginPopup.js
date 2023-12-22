import React, { useState } from 'react';
import './LoginPopup.css';

const LoginPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login clicked:', email, password);
    onClose();
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