import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

const textStyle = {
  fontSize: '1.5em',
  margin: '0.5em'
}

const inputStyle = {
  margin: '0.5em',
  fontSize: '2.1em'
}

const buttonStyle = {
  marginBottom: '13px'
}

export class AddLaserdiscs extends Component {
  constructor(props) {
    super(props);
    this.state = {title: '', lddbNumber: ''};
  }

  updateTitle(event) {
    this.setState({title: event.target.value});
  }

  updateLDDBNumber(event) {
    this.setState({lddbNumber: event.target.value});
  }

  render() {
    if(this.props.addingLaserdisc) {
      return (
        <div style={this.props.style}>
          <input  style={Object.assign({}, inputStyle, {width: '11em'})}
                  onChange={this.updateTitle.bind(this)}
                  type="text" placeholder="Title" />
          <input  style={Object.assign({}, inputStyle, {width: '5em'})}
                  onChange={this.updateLDDBNumber.bind(this)}
                  type="text" placeholder="#LDDB" />
          <Button
            disabled={this.state.lddbNumber.length < 5}
            onClick={this.props.onAddLaserdisc.bind(this, this.state.title, this.state.lddbNumber)}
            style={buttonStyle} bsStyle="success" bsSize="large">
            Add LaserDisc
          </Button>
        </div>
      );
    }
    return (
      <div style={this.props.style}>
        <Button
          onClick={this.props.onSelectAddLaserdisc}
          style={this.props.style} bsStyle="success" bsSize="large">
          Add a LaserDisc
        </Button>
        <span style={textStyle}>or</span>
        <Button
          disabled={true}
          style={this.props.style} bsStyle="info" bsSize="large">
          Import an LDDB List
        </Button>
      </div>
    );
  }
}

export default AddLaserdiscs;
