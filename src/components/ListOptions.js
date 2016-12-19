import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

const buttonStyle = {
  margin: '0.5em 13px'
}

export class ListOptions extends Component {
  render() {
    return (
      <div>
        <div style={this.props.style}>
          <Button
            onClick={this.props.onSelectAddLaserDisc}
            style={buttonStyle} bsStyle="danger" bsSize="large">
            Add a LaserDisc
          </Button>
          <Button
            onClick={this.props.onSelectLDDBList}
            style={buttonStyle} bsStyle="danger" bsSize="large">
            Import an LDDB List
          </Button>
          <Button
            onClick={this.props.onSelectShare}
            style={buttonStyle} bsStyle="danger" bsSize="large">
            Share List
          </Button>
        </div>
      </div>
    );
  }
}

export default ListOptions;
