import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerPage.css';
import ManagerAddTaskPopup from './ManagerAddTaskPopup';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



const ManagerPage = () => {
  const [tasks, setTasks] = useState([]); 
  const [users, setUsers] = useState([]); 


  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openPopup = (task) => {
    setSelectedTask(task);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };


  const taskStatusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 1) + 1;
    return acc;
  }, {});

  const dataForPieChart = {
    labels: Object.keys(taskStatusCounts),
    datasets: [
      {
        data: Object.values(taskStatusCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
       
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
      },
    ],
  };


  const addNewTask = (newTaskData) => {
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTaskData];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };
  

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleAddTaskClick = () => {
    const taskName = prompt('Introdu numele task-ului nou:');
    if (taskName) {
      const newTask = {
        id: tasks.length + 1,
        name: taskName,
        status: 'Open',
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks); 
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
    }
  };
 
  
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); 
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
            <div class="task-item">
              <p>{task.name}</p> 
              <p>{task.status}</p> 
              <button onClick={() => openPopup({ title: 'OPEN', status: 'OPEN', description: 'Sample description' })} id="btn-editTask" >Edit task</button>
              <button onClick={() => deleteTask(task.id)}>Close Task</button>
            </div>
          </div>
        ))}
    </section>
    <section class="stats-section">
    <h3>Piechart</h3>
      <div class="piechart-container">
      <Pie data={dataForPieChart} />
      </div>
      <button onClick={() => openPopup({ title: 'OPEN', status: 'OPEN', description: 'Sample description' })} class="add-task-btn">Add task</button>
    </section>
    {popupVisible && <ManagerAddTaskPopup task={selectedTask} onClose={closePopup} onAddTask={addNewTask}/>}
  </div>
  
  );
};

export default ManagerPage;
