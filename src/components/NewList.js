import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const textStyle = {
  margin: '0.5em'
}

export class NewList extends Component {
  render() {
    return (
      <div style={buttonContainerStyle}>
        <Button
          disabled={this.props.disabled}
          onClick={this.props.onCreateNewList}
          style={this.props.style}
          bsStyle="success"
          bsSize="large">
          Create New List
        </Button>
        <h2 style={textStyle}>or</h2>
        <Button
          disabled={true}
          style={this.props.style}
          bsStyle="info"
          bsSize="large">
          Import an LDDB List
        </Button>
      </div>
    );
  }
}

export default NewList;
