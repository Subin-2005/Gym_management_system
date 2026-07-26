import { StrictMode } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import React from 'react';
import "./assets/css/style.css";
import { GymProvider } from './context/GymContext.jsx';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

import App from './App.jsx'
import AppRoutes from './routes/AppRoutes.jsx';

createRoot(document.getElementById('root')).render(
  <GymProvider>
    <AppRoutes />
  </GymProvider>,
)
