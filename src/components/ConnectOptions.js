import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

const buttonStyle = {
  fontSize: '1em'
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-around'
}

export class ConnectOptions extends Component {

  render() {
    const style = Object.assign({}, buttonStyle, this.props.style);

    return (
      <span style={containerStyle}>
        <Button style={style} bsSize="large" bsStyle='warning'
                disabled={this.props.access === true}
                onClick={this.props.onConnect}>
          Connect
        </Button>
        <Button style={style} bsSize="large" bsStyle='warning'
                disabled={this.props.access === 'open'}
                onClick={this.props.onDisconnect}>
          Disconnect
        </Button>
      </span>
    );
  }
}

export default ConnectOptions;
