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

  const handleUserTypeChange = (type) => {
    setCurrentPage(type);
  };

  const completedTasks = ['Task 1', 'Task 2', 'Task 3'];
  const availableTasks = ['Task 4', 'Task 5', 'Task 6', 'Task 7'];

  

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {currentPage === 'home' || currentPage === 'admin' || currentPage === 'manager' || currentPage === 'user' ? (
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      ) : null}

      {currentPage === 'home' ? (
        <HomePage onUserTypeChange={handleUserTypeChange}/>
      ) : ( currentPage === 'admin' ? (
              <AdminPage onUserTypeChange={handleUserTypeChange}/>
            ) : ( currentPage === 'manager' ? (
                  <HomePage onUserTypeChange={handleUserTypeChange}/> // manager
                ) : ( currentPage === 'user' ? (
                  <div className="task-containers">
                    <TaskContainer title="Completed Tasks" tasks={completedTasks} isAvailableTasks={false} />
                    <TaskContainer title="Available Tasks" tasks={availableTasks} isAvailableTasks={true} />
                  </div>
                ) : (
                  <NotFoundPage onUserTypeChange={handleUserTypeChange}/>
                )))
          )}
    </div>
  );
};

export default App;