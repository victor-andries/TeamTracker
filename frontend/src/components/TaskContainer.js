import React, { useEffect, useState } from 'react';
import './TaskContainer.css';
import TaskDetailsPopup from './TaskDetailsPopup';
import axios from 'axios';

const TaskContainer = ({ title, user_id }) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [availableTasks, setAvailableTasks] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const tasksToDisplay = title === "Completed Tasks" ? completedTasks : availableTasks;

  useEffect(() => {
    if (user_id) {
      fetching();
    }
  }, [user_id]);

  const fetching = () => {
    axios.get('http://localhost:9000/api/user/tasks')
      .then(response => {
        if (title === "Completed Tasks") {
          setCompletedTasks(response.data.completedTasks);
        } else if (title === "Available Tasks") {
          setAvailableTasks(response.data.availableTasks);
        }
      })
      .catch(error => {
        console.error('Eroare la extragerea datelor despre taskuri', error);
      });
  };

  const openPopup = (task) => {
    setSelectedTask(task);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const modifyTask = (task) => {
    axios.patch(`http://localhost:9000/api/user/tasks/${task.task_id}`)
      .then(response => {
        if (response.status === 200) {
          console.log('Task completat cu succes!');
          setAvailableTasks(prevTasks => prevTasks.filter(t => t.task_id !== task.task_id));
          const updatedTask = { ...task, status: 'COMPLETED' };
          setCompletedTasks(prevTasks => [...prevTasks, updatedTask]);
          fetching();
        }
      }).catch(error => {
        console.error('Eroare la modificarea taskului:', error);
      });
  }

  return (
    <div className={`task-container`}>
      <h2>{title}</h2>
      {title === "Completed Tasks" && (
      <button className = 'refresh-button' onClick={fetching}>Reîncarcă Datele</button>)}
      {tasksToDisplay.map((task) => (
        <div key={task.task_id} className="task-box">
          <div className="task-details">
            <p onClick={() => openPopup(task)}>{task.title}</p>
            <p>Status:{task.status}</p>
            {task.status !== 'COMPLETED' && task.status !== 'CLOSED' && (
              <button className ='end-task-button' onClick={() => modifyTask(task)}>
                End Task
              </button>
            )}
          </div>
        </div>
      ))}
      {popupVisible && <TaskDetailsPopup task={selectedTask} onClose={closePopup} />}
    </div>
  );
};

export default TaskContainer;