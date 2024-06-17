import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateLeague from "./pages/CreateLeague.jsx"
import CreateTournament from "./pages/CreateTournament.jsx";
import HomePage from "./pages/HomePage.jsx"
import Login from "./pages/Login.jsx"
// import CreateBracket from "./pages/"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/Login',
        element: <Login />
      },
      {
        path: '/CreateLeague',
        element: <CreateLeague />,
      },
      
       {
         path: '/Tournament',
         element: <CreateTournament />,
       },
       
    ],
  },
]);


// Render the RouterProvider component
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);