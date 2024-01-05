import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import app from './App';
import AuthProvider from './Context/AuthContext';
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
    <Toaster position='top-right' reverseOrder={false}/>
    <RouterProvider router={app}/>
    </AuthProvider>
  </React.StrictMode>
);


