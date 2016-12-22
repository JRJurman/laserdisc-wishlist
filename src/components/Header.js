import React, { Component } from 'react';

import Logo from '../components/Logo';

const appHeaderStyle = {
  backgroundColor: '#2b2424',
  fontSize: '28px',
  padding: '5px 20px',
  color: 'white',
  marginBottom: '20px',
  display:'flex',
  flexWrap: 'wrap',
  justifyContent:'space-between'
};

const titleStyle = {
  marginTop: '17px'
};

const linkStyle = {
  textDecoration: 'none'
}

const childrenStyle = {
  display: 'flex',
  marginTop: '17px',
  alignItems: 'flex-end'
}

class Header extends Component {

  render() {
    const style = Object.assign({}, appHeaderStyle, this.props.style);

    return (
      <div style={style}>
        <div style={titleStyle}>
          <a style={linkStyle} href="/"><Logo /></a>
        </div>
        <div style={childrenStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Header;
