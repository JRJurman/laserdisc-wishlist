import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export class NewList extends Component {
  render() {
    return (
      <div style={buttonContainerStyle}>
        <Button
          disabled={this.props.disabled}
          onClick={this.props.onCreateNewList}
          style={this.props.style}
          bsStyle="warning"
          bsSize="large">
          Create New List
        </Button>
      </div>
    );
  }
}

export default NewList;
