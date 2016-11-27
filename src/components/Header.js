import React, { Component } from 'react';

import Logo from '../components/Logo';

const appHeaderStyle = {
  backgroundColor: '#2b2424',
  fontFamily: 'Michroma',
  fontSize: '28px',
  fontWeight: 'bold',
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

class Header extends Component {

  render() {
    const style = Object.assign({}, appHeaderStyle, this.props.style);

    return (
      <div style={style}>
        <div style={titleStyle}>
          <a style={linkStyle} href="/"><Logo /></a>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Header;
