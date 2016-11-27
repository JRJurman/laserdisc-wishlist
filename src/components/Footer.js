import React, { Component } from 'react';

const footerStyle = {
  backgroundColor: '#2b2424',
  padding: '5px 20px',
  color: 'white',
  display:'flex',
  flexFlow: 'row-wrap',
  justifyContent:'space-between'
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none'
}

export class Footer extends Component {

  render() {
    const style = Object.assign({}, footerStyle, this.props.style);

    return (
      <footer style={style}>
        <a  href="http://jrjurman.com/" target="_blank"
            style={linkStyle}>
          Created By Jesse Jurman
        </a>
        <a  href="http://www.lddb.com/" target="_blank"
            style={linkStyle}>
          Powered By LaserDisc Database
        </a>
      </footer>
    );
  }
}

export default Footer;
