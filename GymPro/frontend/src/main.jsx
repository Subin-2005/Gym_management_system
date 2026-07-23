import { StrictMode } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import React from 'react';
import "./assets/css/style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
