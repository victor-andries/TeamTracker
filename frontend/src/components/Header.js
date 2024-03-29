import React, { useState } from "react";
import logoDark from './../media/logo_wide_white.png';
import logoLight from './../media/logo_wide_black.png';
import pfp from './../media/pfp1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import ProfilePopup from './ProfilePopup';

const Header = ({ darkMode, toggleDarkMode, onUserTypeChange, user_id }) => {
  const logoToRender = darkMode ? logoDark : logoLight;
  const [popupVisible, setPopupVisible] = useState(false);
  const [isImgHovered, setImgHovered] = useState(false);

  const handleImgHover = () => {
    setImgHovered(true);
  };
  
  const handleImgLeave = () => {
    setImgHovered(false);
  };

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  
    return (
    <header className={`app-header ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="logo-container">
        <img src={logoToRender} alt="Logo" className="logo" onClick={() => onUserTypeChange('home')}/>
      </div>
      <div className="theme-switcher" onClick={toggleDarkMode}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
      </div>
      <div className="profile-picture" onClick={togglePopup}>
        <img src={pfp} alt="Profile" className="profile-img" onMouseEnter={handleImgHover} onMouseLeave={handleImgLeave}/>
      </div>
      {popupVisible && <ProfilePopup onClose={togglePopup} onUserTypeChange={onUserTypeChange} user_id={user_id} />}
    </header>
  );
};

export default Header;