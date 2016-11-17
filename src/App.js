import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {

    const appStyle = {
      textAlign: 'center'
    }

    const appLogoStyle = {
      height: '80px'
    }

    const appHeaderStyle = {
      backgroundColor: '#222',
      height: '150px',
      padding: '20px',
      color: 'white'
    }

    const appIntroStyle = {
      fontSize: 'large'
    }

    return (
      <div style={appStyle}>
        <div style={appHeaderStyle}>
          <img src={logo} style={appLogoStyle} alt="logo" />
          <h2>Laserdisc Wishlists</h2>
        </div>
        <p style={appIntroStyle}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
