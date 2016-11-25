import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { addingLaserdisc, finishAddingLaserdisc } from '../reducers/listState';

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

  onSelectAddLaserdisc() {
    this.props.dispatch(addingLaserdisc());
  }

  onAddLaserdisc() {
    const {dispatch, listId} = this.props;
    const {title, lddbNumber} = this.state;
    dispatch(finishAddingLaserdisc(dispatch, listId, title, lddbNumber));
  }

  render() {
    if(this.props.listState.addingLaserdisc) {
      return (
        <div style={buttonContainerStyle}>
          <input  style={Object.assign({}, inputStyle, {width: '11em'})}
                  onChange={this.updateTitle.bind(this)}
                  type="text" placeholder="Title" />
          <input  style={Object.assign({}, inputStyle, {width: '5em'})}
                  onChange={this.updateLDDBNumber.bind(this)}
                  type="text" placeholder="#LDDB" />
          <Button
            onClick={this.onAddLaserdisc.bind(this)}
            style={this.props.style} bsStyle="success" bsSize="large">
            Add Laserdisc
          </Button>
        </div>
      );
    }
    return (
      <div style={buttonContainerStyle}>
        <Button
          onClick={this.onSelectAddLaserdisc.bind(this)}
          style={this.props.style} bsStyle="success" bsSize="large">
          Add a Laserdisc
        </Button>
        <h2 style={textStyle}>or</h2>
        <Button
          style={this.props.style} bsStyle="info" bsSize="large">
          Import an LDDB List
        </Button>
      </div>
    );
  }
}

function select(state) {
  return {
    listState: state.listState
  }
}

export default connect(select)(AddLaserdiscs);
