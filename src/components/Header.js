import React, { Component } from 'react';
import { browserHistory } from 'react-router'

const appHeaderStyle = {
  backgroundColor: '#222',
  padding: '5px',
  color: 'white',
  marginBottom: '20px'
};

const titleStyle = {
  cursor: 'pointer'
};

class Header extends Component {

  onSelectTitle() {
    browserHistory.push('/');
  }

  render() {
    return (
      <div style={appHeaderStyle}>
        <h2 style={titleStyle}
            onClick={this.onSelectTitle}>
          Laserdisc Wishlist
        </h2>
      </div>
    );
  }
}

export default Header;
