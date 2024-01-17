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
  const [selectedUser, setSelectedUser] = useState(null);

  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openPopup = (task) => {
    setSelectedTask(task);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  

  const filteredTasks = selectedUser ? tasks.filter(task => task.user_id === selectedUser) : tasks;

  const taskStatusCounts = filteredTasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
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

  const fetchTasksForUser = (user_id) => {
    axios.get(`http://localhost:9000/api/tasks/${user_id}`)
    .then(response => {
      setTasks(response.data);
    })
    .catch(error => {
      console.error('Eroare la preluarea taskurilor pentru utilizator', error);
    });
  }

  const addNewTask = (newTaskData) => {
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTaskData];
      return updatedTasks;
    });
  };

  const fetchUsers = () => {
    axios.get('http://localhost:9000/api/admin/users')
      .then((response) => {
        if (response.data.users) {
          setUsers(response.data.users);
        }
      })
      .catch((error) => {
        console.error('Eroare la extragerea datelor despre useri', error);
      });
  };

<<<<<<< Updated upstream
=======
 
  
>>>>>>> Stashed changes
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserClick = (user_id) => {
    setSelectedUser(user_id);
    fetchTasksForUser(user_id)
  }

  const modifyTask = (task) => {
    axios.patch(`http://localhost:9000/api/tasks/closed/${task.task_id}`)
      .then(response => {
        if (response.status === 200) {
          console.log('Task inchis cu succes!');
          setSelectedTask(task)
          fetchTasksForUser(task.user_id)
        }
      }).catch(error => {
        console.error('Eroare la modificarea taskului:', error);
      });
  }

  return (
    <div className="manager-page">
      <aside className="user-list">
        <h3>Users</h3>
        <ul>
          {users.map(user => (
            <li key={user.user_id} onClick={() => handleUserClick(user.user_id)}>{user.user_name}</li>
          ))}
        </ul>
      </aside>
      <section className="tasks-section">
        <h3>Tasks</h3>
        {filteredTasks.map(task => (
          <div id="tasks" key={task.id}>
            <div className="task-item">
              <p>{task.title}</p>
              <p>{task.status}</p>
              <button onClick={() => modifyTask(task)}>Close Task</button>
            </div>
          </div>
        ))}
      </section>
      <section className="stats-section">
        <h3>Piechart</h3>
        <div className="piechart-container">
          <Pie data={dataForPieChart} />
        </div>
        <button onClick={() => openPopup({ title: 'OPEN', status: 'OPEN', description: 'Sample description' })} class="add-task-btn">Add task</button>
      </section>
      {popupVisible && <ManagerAddTaskPopup task={selectedTask} onClose={closePopup} onAddTask={addNewTask} />}
    </div>

  );
};


export default ManagerPage;
