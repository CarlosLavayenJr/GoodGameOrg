import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateLeague from "./pages/CreateLeague.jsx"
import HomePage from "./pages/HomePage.jsx"
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
        path: '/CreateLeague',
        element: <CreateLeague />,
      },
      
      // {
      //   path: '/Tournament',
      //   element: <CreateTournament />,
      // },
    ],
  },
]);



// Render the RouterProvider component
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);