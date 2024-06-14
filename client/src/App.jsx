import { useState } from 'react';
import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import DrawerComponent from './components/DrawerComp';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
         <Navbar />
         <DrawerComponent />
   </div>

  );

  return(
    <div>
  <Footer></Footer>
  </div>
  );
};

export default App
