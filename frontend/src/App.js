import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Tracker from './pages/tracker';
import Contact from './pages/contact';
import Navbar from './components/navbar';
import Lowbar from './components/lowbar';
import './App.css';
import TopButton from './components/topbutton';


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tracker' element={<Tracker />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <TopButton />
      <Lowbar />
    </>
  );
}

export default App;
