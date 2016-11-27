import React, { Component } from 'react';

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
      <div>
        <span style={firstStyleMerge}>
          MY
        </span>
        <span style={secondStyleMerge}>
          LASERDISC
        </span>
      </div>
    );
  }
}

export default Logo;
