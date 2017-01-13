import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

const buttonStyle = {
  fontSize: '1em'
}

export class ConnectOptions extends Component {

  render() {
    const style = Object.assign({}, buttonStyle, this.props.style);

    const lockText = (
      <span>
        <i className="fa fa-lock" aria-hidden="true"/> Lock List
      </span>
    );
    const unlockText = (
      <span>
        <i className="fa fa-unlock-alt" aria-hidden="true"/> Unlock List
      </span>
    );

    return (
      <Button style={style} bsSize="large" bsStyle='warning'
              onClick={this.props.access !== true ? (this.props.onConnect) : (this.props.onDisconnect)}>
        {this.props.access !== true ? lockText : unlockText}
      </Button>
    );
  }
}

export default ConnectOptions;
