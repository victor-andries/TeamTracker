import React, { useState } from 'react';
import Header from './components/Header';
import TaskContainer from './components/TaskContainer';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import NotFoundPage from './components/NotFoundPage';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const completedTasks = ['Task 1', 'Task 2', 'Task 3'];
  const availableTasks = ['Task 4', 'Task 5', 'Task 6', 'Task 7'];

  const userData = [
    { id: 1, type: 'regular', name: 'User 1' },
    { id: 1, type: 'regular', name: 'User 2' },
    { id: 1, type: 'regular', name: 'User 3' },
    { id: 2, type: 'manager', name: 'Manager 1' },
    { id: 1, type: 'regular', name: 'User 4' },
    { id: 2, type: 'manager', name: 'Manager 2' },
    { id: 2, type: 'manager', name: 'Manager 3' }
  ];

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {currentPage === 'home' || currentPage === 'admin' || currentPage === 'manager' || currentPage === 'user' ? (
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onPageChange={handlePageChange} />
      ) : null}

      {currentPage === 'home' ? (
        <HomePage onPageChange={handlePageChange} />
      ) : ( currentPage === 'admin' ? (
              <AdminPage userData={userData} />
            ) : ( currentPage === 'manager' ? (
                  <HomePage onPageChange={handlePageChange} /> // manager
                ) : ( currentPage === 'user' ? (
                  <div className="task-containers">
                    <TaskContainer title="Completed Tasks" tasks={completedTasks} isAvailableTasks={false} />
                    <TaskContainer title="Available Tasks" tasks={availableTasks} isAvailableTasks={true} />
                  </div>
                ) : (
                  <NotFoundPage onPageChange={handlePageChange}/>
                )))
          )}
    </div>
  );
};

export default App;