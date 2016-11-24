import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class AddLaserdiscButton extends Component {
  render() {
    return (
      <Button
        style={this.props.style}
        bsStyle="success"
        bsSize="large">
        Add a Laserdisc
      </Button>
    );
  }
}

export default AddLaserdiscButton;
