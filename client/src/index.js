import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

//création de la racine avec ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

//rendu de l'application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);