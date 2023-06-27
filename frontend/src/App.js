import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Navbar from './components/navbar';
import './App.css';

function App() {

  const [testdata, settestdata] = useState(null)

  function getData(){
    fetch("http://localhost:5000/testdata")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      settestdata({
        data_1: data.data1,
        data_2: data.data2,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <div>
        <header>
          <p>To retrieve backend test data:</p>
          <button onClick={getData}>Click Me</button>
          {testdata &&
          <div>
            <p>Data 1: {testdata.data_1}</p>
            <p>Data 2: {testdata.data_2}</p>
          </div>
          }
        </header>
      </div>
    </>
  );
}

export default App;
