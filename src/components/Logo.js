import React, { Component } from 'react';

const firstStyle = {
  color: 'black',
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
    return (
      <div>
        <span style={firstStyle}>
          MY
        </span>
        <span style={secondStyle}>
          LASERDISC
        </span>
      </div>
    );
  }
}

export default Logo;
