import React, { useState } from 'react';
import './AddUserPopup.css';
import axios from 'axios';

const AddUserPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    password: '',
    email: '',
    team_name: '',
    user_type: "user",
    manager_id: '',
    profile_photo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, profile_photo: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
    });
  axios.post('http://localhost:9000/api/admin/adduser', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      if(response.status === 200){
        console.log('User adaugat cu succes!');
      }
      onClose();

    }).catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="add-user-popup">
        <form className="add-user-popup-content" onSubmit={handleSubmit}>
        <h2>Add User</h2>
        <label>
          Name:
          <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Team Name:
          <input type="text" name="team_name" value={formData.team_name} onChange={handleChange} />
        </label>
        <label>
          Manager id:
          <input type="number" name="manager_id" value={formData.manager_id} onChange={handleChange} />
        </label>
        <label>
          Profile Picture:
          <input type="file" name="profile_photo" accept=".png" onChange={handleFileChange} />
        </label>
        <button type="submit" >Add User</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddUserPopup;