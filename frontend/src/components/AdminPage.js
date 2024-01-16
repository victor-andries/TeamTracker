import React, { useEffect, useState } from 'react';
import './AdminPage.css';
import AddUserPopup from './AddUserPopup';
import AddManagerPopup from './AddManagerPopup';
import RemoveUserPopup from './RemoveUserPopup';
import axios from 'axios';

const AdminPage = ({}) => {
  const [userPopupVisible, setUserPopupVisible] = useState(false);
  const [managerPopupVisible, setManagerPopupVisible] = useState(false);
  const [removePopupVisible, setRemovePopupVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [removePopupPosition, setRemovePopupPosition] = useState({ x: 0, y: 0 });

  const [ users, setUsers ] = useState([]);
  const [ managers, setManagers ] = useState([]);

  const fetching = () => {
    axios.get("http://localhost:9000/api/admin/users")
    .then((response) => {
      if (response.data.users && response.data.managers)
      {
        setUsers(response.data.users);
        setManagers(response.data.managers);
      }
    })
    .catch((error) => {
      console.error('Eroare la extragerea datelor despre useri si manageri', error);
    });
  };

  useEffect(() => {
    fetching();
  }, []);
  
  const toggleUserPopup = () => {
    setUserPopupVisible(!userPopupVisible);
    fetching();
  };
  
  const toggleManagerPopup = () => {
    setManagerPopupVisible(!managerPopupVisible);
    fetching();
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
          <ul>
            {users && users.map((user) => (
              <li key={user.user_id}>{user.user_name}</li>
            ))}
          </ul>
        </div>
        <div className="user-container">
          <h2>Managers</h2>
          <ul>
            { managers && managers.map((manager) => (
              <li key={manager.user_id}>{manager.user_name}</li>
            ))}
          </ul>
        </div>
      </div>
      {userPopupVisible && <AddUserPopup onClose={toggleUserPopup}/>}
      {managerPopupVisible && <AddManagerPopup onClose={toggleManagerPopup}/>}
      {removePopupVisible && <RemoveUserPopup user={selectedUser} onClose={closeRemovePopup} removePopupPosition={removePopupPosition} />}
    </div>
  );
};

export default AdminPage;