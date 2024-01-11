import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerPage.css';


const ManagerPage = () => {
  const [tasks, setTasks] = useState([]); // Inițializăm starea pentru task-uri
  const [users, setUsers] = useState([]); // State for users
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
    <div className="manager-page">
      <aside className="user-list">
        <h3>Utilizatori</h3>
        <ul>
          {users.map(user => (
            <li key={user.user_id}>{user.user_name}</li>
          ))}
        </ul>
      </aside>
      <section className="tasks-section">
        <h3>Task-uri</h3>
        {tasks.map(task => (
          <div key={task.id}>{task.name} - {task.status}</div>
        ))}
      </section>
      <section className="piechart-section">
        <h3>Statistici</h3>
        {/* Piechart-ul */}
      </section>
      <button onClick={handleAddTaskClick} className="add-task-btn">Adaugă Task</button>
    </div>
  );
};

export default ManagerPage;
