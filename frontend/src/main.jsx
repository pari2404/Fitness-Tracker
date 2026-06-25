import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// This is the missing link that mounts your app into <div id="root">
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);