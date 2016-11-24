import React, { Component } from 'react';

import NewListButton from '../components/NewListButton';
import ImportListButton from '../components/ImportListButton';

const mainStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const textStyle = {
  margin: '0.5em'
}

class Main extends Component {
  render() {
    const style = Object.assign({}, mainStyle, this.props.style);

    return (
      <div style={style}>
        <NewListButton />
        <h2 style={textStyle}>or</h2>
        <ImportListButton/>
      </div>
    );
  }
}

export default Main;
