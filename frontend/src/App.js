import React, { useState } from 'react';
import Header from './components/Header';
import TaskContainer from './components/TaskContainer';
import HomePage from './components/HomePage';
import ManagerPage from './components/ManagerPage';
import AdminPage from './components/AdminPage';
import NotFoundPage from './components/NotFoundPage';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [user_id, setUserID] = useState(null);
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleUserTypeChange = (currentPage, user_id = null) => {
    setCurrentPage(currentPage);
    setUserID(user_id);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {currentPage === 'home' || currentPage === 'admin' || currentPage === 'manager' || currentPage === 'user' ? (
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onUserTypeChange={handleUserTypeChange} user_id={user_id}/>
      ) : null}

      {currentPage === 'home' ? (
        <HomePage  onUserTypeChange={handleUserTypeChange}/>
      ) : ( currentPage === 'admin' ? (
              <AdminPage onUserTypeChange={handleUserTypeChange}/>
            ) : ( currentPage === 'manager' ? (
              <ManagerPage  onUserTypeChange={handleUserTypeChange}/> 
                ) : ( currentPage === 'user' ? (
                  <div className="task-containers">
                    <TaskContainer title="Completed Tasks" user_id={user_id}/>
                    <TaskContainer title="Available Tasks" user_id={user_id}/>
                  </div>
                ) : (
                  <NotFoundPage onUserTypeChange={handleUserTypeChange}/>
                )))
          )}
    </div>
  );
};

export default App;