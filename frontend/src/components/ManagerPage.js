import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerPage.css';
import ManagerAddTaskPopup from './ManagerAddTaskPopup';

const ManagerPage = () => {
  const [tasks, setTasks] = useState([]); // Inițializăm starea pentru task-uri
  const [users, setUsers] = useState([]); // State for users


  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openPopup = (task) => {
    setSelectedTask(task);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  // Funcția pentru adăugarea unui nou task
  const handleAddTaskClick = () => {
    const taskName = prompt('Introdu numele task-ului nou:');
    if (taskName) {
      const newTask = {
        id: tasks.length + 1,
        name: taskName,
        status: 'Open',
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks); // Actualizăm starea task-urilor
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Salvăm în LocalStorage
    }
  };
 
  // La încărcarea componentei, încarcă task-urile salvate din LocalStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Replace with your API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    if (savedTasks) {
      setTasks(savedTasks);
    }
    fetchUsers();

  }, []);

  return (
    <div class="manager-page">
    <aside class="user-list">
    <h3>Users</h3>
      <ul>
      {users.map(user => (
            <li key={user.user_id}>{user.user_name}</li>
          ))}
      </ul>
    </aside>
    <section class="tasks-section">
      <h3>Tasks</h3>
      {tasks.map(task => (
          <div id="tasks" key={task.id}>
            <p>{task.name}</p> 
            {/* <button id="btn-editTask" >Edit task</button>  */}
            </div>
        ))}
    </section>
    <section class="stats-section">
    <h3>Piechart</h3>
      <div class="piechart-container">
        
      </div>
      <button onClick={() => openPopup({ title: 'OPEN', status: 'OPEN', description: 'Sample description' })} class="add-task-btn">Add task</button>
    </section>
    {popupVisible && <ManagerAddTaskPopup task={selectedTask} onClose={closePopup} />}
  </div>
  
  );
};

export default ManagerPage;
