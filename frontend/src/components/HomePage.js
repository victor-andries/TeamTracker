import React, { useState } from 'react';
import teamTrackerImage from './../media/teamtracker_image.jpg';
import LoginPopup from './LoginPopup';
import './HomePage.css';

const HomePage = ({onUserTypeChange}) => {
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);

  const toggleLoginPopup = () => {
    setLoginPopupVisible(!loginPopupVisible);
  };

  return (
    <div className="home-page">
      <img src={teamTrackerImage} alt="TeamTracker" className="home-image" />
      <div className="home-content">
        <p className="description">
          TeamTracker is a task tracking web application that helps teams stay organized and efficient.<br></br>Brought to you by Denis, Ariton & Victor.
        </p>
        <button className="login-button" onClick={toggleLoginPopup}>Login</button>
        <p onClick={() =>  onUserTypeChange('user')}>UserPage</p>
        <p onClick={() =>  onUserTypeChange('manager')}>ManagerPage</p>
        <p onClick={() =>  onUserTypeChange('admin')}>AdminPage</p>
        <p onClick={() =>  onUserTypeChange('sdfkshfkss')}>ErrorPage</p>
      </div>
      {loginPopupVisible && <LoginPopup onClose={toggleLoginPopup} onLoginSuccess={onUserTypeChange} />}
    </div>
  );
};

export default HomePage;