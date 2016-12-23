import React, { Component } from 'react';
import { connect } from 'react-redux';

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

      </div>
    );
  }
}

function select(state) {
  return {
    apiServer: state.apiServer
  }
}

export default connect(select)(Main);
