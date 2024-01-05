import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import AdmHome from './pages/AdmHome';
import WornkingHome from './pages/WorinkingHome';
import Register from './pages/Register';
import Layout from './Components/Layout';

const app = createBrowserRouter([
 {
  element: <Layout/>,
  children: [
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/adm",
      element: <AdmHome/>
    },
    {
      path: "/working",
      element: <WornkingHome/>
    },
    {
      path: "/register",
      element: <Register/>
    }
  ]
 }
])

export default app