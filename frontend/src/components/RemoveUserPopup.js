import React from 'react';
import './RemoveUserPopup.css';

const RemoveUserPopup = ({ user, onClose, removePopupPosition }) => {
  const handleRemoveUser = () => {
    onClose();
  };

  return (
    <div className="remove-user-popup" style={{ left: removePopupPosition.x, top: removePopupPosition.y }}>
      <h2>{`Remove ${user.username}?`}</h2>
      <button onClick={handleRemoveUser}>Remove</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default RemoveUserPopup;