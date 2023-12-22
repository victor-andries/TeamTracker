import React from 'react';
import './NotFoundPage.css';
import notFoundGif from './../media/404.gif';

const NotFoundPage = ({ onPageChange }) => {
  return (
    <div className="not-found-page">
      <h2>404: Page Not Found</h2>
      <img src={notFoundGif} alt="404 Gif" />
      <button onClick={() => { onPageChange('home'); }}>Return Home</button>
    </div>
  );
};

export default NotFoundPage;