import React from 'react';
import logo from './logo.svg';
import './home.css';

export function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <img src={logo} className="home-logo" alt="logo" />
        <p>
          Edit <code>src/Home.js</code> and save to reload.
        </p>
        <a
          className="home-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
