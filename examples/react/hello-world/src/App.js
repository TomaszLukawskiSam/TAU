import React from 'react';
import logo from './logo.svg';
import './App.css';
import Spin from './Spin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello world in ReactJS.
        </p>
        <Spin />
      </header>
    </div>
  );
}

export default App;
