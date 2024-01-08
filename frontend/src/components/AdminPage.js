import React, { useState } from 'react';
import './AdminPage.css';
import AddUserPopup from './AddUserPopup';
import AddManagerPopup from './AddManagerPopup';
import RemoveUserPopup from './RemoveUserPopup';

const AdminPage = ({ userData }) => {
  const [userPopupVisible, setUserPopupVisible] = useState(false);
  const [managerPopupVisible, setManagerPopupVisible] = useState(false);
  const [removePopupVisible, setRemovePopupVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [removePopupPosition, setRemovePopupPosition] = useState({ x: 0, y: 0 });

  
  const toggleUserPopup = () => {
    setUserPopupVisible(!userPopupVisible);
  };
  
  const toggleManagerPopup = () => {
    setManagerPopupVisible(!managerPopupVisible);
  };

  const openRemovePopup = (user, event) => {
    setSelectedUser(user);
    setRemovePopupPosition({ x: event.clientX, y: event.clientY });
    setRemovePopupVisible(true);
  };

  const closeRemovePopup = () => {
    setRemovePopupVisible(false);
  };

  return (
    <div className="admin-page">
      <div className='admin-buttons'>
        <button onClick={toggleUserPopup}>Add User</button>
        <button onClick={toggleManagerPopup}>Add Manager</button>
      </div>
      <div className='admin-content'>
        <div className="user-container">
          <h2>Users</h2>
        </div>
        <div className="manager-container">
          <h2>Managers</h2>
        </div>
      </div>
      {userPopupVisible && <AddUserPopup onClose={toggleUserPopup}/>}
      {managerPopupVisible && <AddManagerPopup onClose={toggleManagerPopup}/>}
      {removePopupVisible && <RemoveUserPopup user={selectedUser} onClose={closeRemovePopup} removePopupPosition={removePopupPosition} />}
    </div>
  );
};

export default AdminPage;