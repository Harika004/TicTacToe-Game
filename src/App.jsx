import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import Home from './Components/Home';
import Rules from './Components/Rules';
import Box3x3 from './Components/Box3x3';
import Box4x4 from './Components/Box4x4';
import Box5x5 from './Components/Box5x5';
// tailwind is installed already. 
function App() {
  

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Rules" element={<Rules/>}/>
        <Route path="/box3x3/:initialPlayer" element={<Box3x3/>}/>
        <Route path="/box4x4/:initialPlayer" element={<Box4x4/>}/>
        <Route path="/box5x5/:initialPlayer" element={<Box5x5/>}/>
      </Routes>
    </div>
  )
}

export default App
