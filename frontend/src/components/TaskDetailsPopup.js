import React from 'react';
import './TaskDetailsPopup.css';

const TaskDetailsPopup = ({ task, onClose }) => {
  return (
    <div className="task-details-popup">
      <div className="popup-content">
        <h2>{task.title}</h2>
        <p>Status: {task.status}</p>
        <p>Description: {task.description}</p>
        <label>
          Proposed solution:
          <textarea></textarea>
        </label>
        <label>
          File Upload:<br></br>
          <input type="file" />
        </label>
        <button onClick={onClose}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskDetailsPopup;