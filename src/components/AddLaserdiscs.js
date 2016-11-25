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

const inputStyle = {
  margin: '0.5em',
  fontSize: '2.1em'
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
        <div style={buttonContainerStyle}>
          <input  style={Object.assign({}, inputStyle, {width: '11em'})}
                  onChange={this.updateTitle.bind(this)}
                  type="text" placeholder="Title" />
          <input  style={Object.assign({}, inputStyle, {width: '5em'})}
                  onChange={this.updateLDDBNumber.bind(this)}
                  type="text" placeholder="#LDDB" />
          <Button
            onClick={this.props.onAddLaserdisc.bind(this, this.state.title, this.state.lddbNumber)}
            style={this.props.style} bsStyle="success" bsSize="large">
            Add Laserdisc
          </Button>
        </div>
      );
    }
    return (
      <div style={buttonContainerStyle}>
        <Button
          onClick={this.props.onSelectAddLaserdisc}
          style={this.props.style} bsStyle="success" bsSize="large">
          Add a Laserdisc
        </Button>
        <h2 style={textStyle}>or</h2>
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
