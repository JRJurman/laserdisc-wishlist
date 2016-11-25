import React, { Component } from 'react';

import NewList from '../components/NewList';

const mainStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

class Main extends Component {
  render() {
    const style = Object.assign({}, mainStyle, this.props.style);

    return (
      <div style={style}>
        <NewList />
      </div>
    );
  }
}

export default Main;
