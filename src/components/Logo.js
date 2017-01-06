import React, { Component } from 'react';

const logoStyle = {
  fontFamily: 'Michroma',
  fontWeight: 'bold'
}

const firstStyle = {
  color: '#222222',
  textShadow: `
   -1px -1px 0 #FFF,
   1px -1px 0 #FFF,
   -1px 1px 0 #FFF,
   1px 1px 0 #FFF
  `
}

const secondStyle = {
  color: 'white'
}

class Logo extends Component {
  render() {
    const firstStyleMerge = Object.assign({}, firstStyle, this.props.style)
    const secondStyleMerge = Object.assign({}, secondStyle, this.props.style)

    return (
      <div style={logoStyle}>
        <span style={firstStyleMerge}>
          TALLY
        </span>
        <span style={secondStyleMerge}>
          JACKET
        </span>
      </div>
    );
  }
}

export default Logo;
