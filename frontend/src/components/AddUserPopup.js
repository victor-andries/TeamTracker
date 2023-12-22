import React, { useState } from 'react';
import './AddUserPopup.css';

const AddUserPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    email: '',
    password: '',
    repeatPassword: '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, profilePicture: file }));
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <div className="add-user-popup">
        <div className="add-user-popup-content">
        <h2>Add User</h2>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Assigned Manager:
          <input type="text" name="manager" value={formData.manager} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <label>
          Repeat Password:
          <input
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
          />
        </label>
        <label>
          Profile Picture:
          <input type="file" accept=".png" onChange={handleFileChange} />
        </label>
        <button onClick={handleSubmit}>Add User</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddUserPopup;