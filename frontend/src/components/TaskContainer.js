import React, { useState } from 'react';
import './TaskContainer.css';
import TaskDetailsPopup from './TaskDetailsPopup';

const TaskContainer = ({ title, tasks, isAvailableTasks }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openPopup = (task) => {
    setSelectedTask(task);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className={`task-container ${isAvailableTasks ? 'available-tasks' : ''}`}>
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        isAvailableTasks ? (
          <div key={index} className="task-box">
            <div className="task-details">
              <p onClick={() => openPopup({ title: task, status: 'Not Started', description: 'Sample description' })}>{task}</p>
              <p>Status: Not Started</p>
              <button onClick={() => openPopup({ title: task, status: 'Not Started', description: 'Sample description' })}>
                Start Working
              </button>
            </div>
          </div>
        ) : (
          <p key={index} className='pTaskContainer'>{task}</p>
        )
      ))}
      {popupVisible && <TaskDetailsPopup task={selectedTask} onClose={closePopup} />}
    </div>
  );
};

export default TaskContainer;