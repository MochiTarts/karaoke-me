import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Home, Karaoke } from './pages';
import { Navbar } from './components';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
    <BrowserRouter>
      <div id="filter">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/karaoke" element={<Karaoke />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
