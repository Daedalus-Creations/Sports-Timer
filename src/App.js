import React from 'react';
import logo from './logo.svg';
import './App.css';
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Daedalus Sports Timer
      </header>
        <div className="Timer-div">
            <Timer />
        </div>
        <div className="Stopwatch-div">
            <Stopwatch />
        </div>
    </div>
  );
}

export default App;
