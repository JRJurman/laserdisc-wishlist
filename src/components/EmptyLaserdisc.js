import React, { Component } from 'react';

const componentStyle = {
  width: '250px',
  margin: '1em'
}

export class EmptyLaserDisc extends Component {
  render() {
    const style = Object.assign({}, componentStyle, this.props.style);

    return (
      <div style={style}/>
    );
  }
}

export default EmptyLaserDisc;
