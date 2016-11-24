import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class ImportListButton extends Component {
  render() {
    return (
      <Button
        style={this.props.style}
        bsStyle="info"
        bsSize="large">
        Import an LDDB List
      </Button>
    );
  }
}

export default ImportListButton;
