import React, { useState, useEffect } from 'react';
import './ProfilePopup.css';

const ProfilePopup = ({ onClose, userInfo, isImgHovered, onPageChange }) => {
  const [topPosition, setTopPosition] = useState(50);

  useEffect(() => {
    if (isImgHovered) {
      setTopPosition(90);
    } else {
      setTopPosition(80);
    }
  }, [isImgHovered]);

  const userName = userInfo?.name || 'N/A';
  const userAccountType = userInfo?.accountType || 'N/A';
  const userEmail = userInfo?.email || 'N/A';

  return (
    <div className="profile-popup" style={{ top: `${topPosition}px` }}>
      <div className="popup-content">
        <div className="user-info">
          <p>{userName}</p>
          <p>{userAccountType}</p>
          <p>{userEmail}</p>
        </div>
        <button onClick={() => { onClose(); onPageChange('home'); }}>Sign Out</button>
      </div>
    </div>
  );
};

export default ProfilePopup;