import React from 'react';
import logo from './logo.svg';
import './login.css';

export function Login() {
  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} className="login-logo" alt="logo" />
        <p>
          Edit <code>src/Login.js</code> and save to reload.
        </p>
        <a
          className="login-link"
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
