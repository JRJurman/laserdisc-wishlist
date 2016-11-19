import React, { Component } from 'react';
const appHeaderStyle = {
  backgroundColor: '#222',
  padding: '5px',
  color: 'white',
  marginBottom: '20px'
}

class Header extends Component {
  render() {
    return (
      <div style={appHeaderStyle}>
        <h2>Laserdisc Wishlist</h2>
      </div>
    );
  }
}

export default Header;
