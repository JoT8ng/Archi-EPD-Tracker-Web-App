import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {

  const [testdata, settestdata] = useState(null)

  function getData(){
    fetch("/testdata")
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

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
  );
}

export default App;
