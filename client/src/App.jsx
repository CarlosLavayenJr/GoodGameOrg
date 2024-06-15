import { useState } from 'react';
import React from 'react';
import './App.css'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import {Outlet} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
         <Navbar />
         <Outlet />
         <Footer />
   </div>

  );
};

export default App
