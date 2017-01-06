import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

const buttonStyle = {
  margin: '0.25em 13px'
}

export class ListOptions extends Component {
  render() {
    const buttonSize = this.props.size < 3 ? "small" : "large";

    return (
      <div>
        <div style={this.props.style}>
          <Button
            onClick={this.props.onSelectAddLaserDisc}
            style={buttonStyle} bsStyle="danger" bsSize={buttonSize}>
            Add a LaserDisc
          </Button>
          <Button
            onClick={this.props.onSelectLDDBList}
            style={buttonStyle} bsStyle="danger" bsSize={buttonSize}>
            Import an LDDB List
          </Button>
          <Button
            onClick={this.props.onSelectShare}
            style={buttonStyle} bsStyle="danger" bsSize={buttonSize}>
            Share List
          </Button>
        </div>
      </div>
    );
  }
}

export default ListOptions;
