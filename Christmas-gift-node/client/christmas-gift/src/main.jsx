import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Snowfall from 'react-snowfall';


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <div style={{  position: 'relative' }} className={`h-screen `}>
    <Snowfall snowflakeCount={400} />
    <App />
  </div>,
  
);
