import React, { Component } from 'react';

import Logo from '../components/Logo';

const appHeaderStyle = {
  backgroundColor: '#222',
  fontFamily: 'Michroma',
  fontSize: '28px',
  fontWeight: 'bold',
  padding: '5px 20px',
  color: 'white',
  marginBottom: '20px',
  display:'flex',
  justifyContent:'space-between'
};

const titleStyle = {
  cursor: 'pointer',
  marginTop: '17px'
};


class Header extends Component {

  onSelectTitle() {
    window.location = "/"
  }

  render() {
    return (
      <div style={appHeaderStyle}>
        <div style={titleStyle} onClick={this.onSelectTitle}>
          <Logo />
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Header;
