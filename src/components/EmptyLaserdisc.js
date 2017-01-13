import React, { Component } from 'react';

const componentStyle = {
  width: '232px',
  margin: '0.5em'
}

export class EmptyLaserDisc extends Component {
  render() {
    if (this.props.size < 4) {
      componentStyle.width = '162px';
      componentStyle.margin = '0.25em';
    }
    else if (this.props.size < 5) {
      componentStyle.width = '190px';
      componentStyle.margin = '0.25em';
    } else {
      componentStyle.width = '232px';
      componentStyle.margin = '0.5em';
    }

    const style = Object.assign({}, componentStyle, this.props.style);

    return (
      <div style={style}/>
    );
  }
}

export default EmptyLaserDisc;
