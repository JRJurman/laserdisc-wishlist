import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createNewList } from '../reducers/apiServer';

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const textStyle = {
  margin: '0.5em'
}

export class NewList extends Component {
  onCreateNewList() {
    const {dispatch} = this.props;
    dispatch(createNewList(dispatch));
  }

  render() {
    return (
      <div style={buttonContainerStyle}>
        <Button
          disabled={this.props.apiServer.creatingList}
          onClick={this.onCreateNewList.bind(this)}
          style={this.props.style}
          bsStyle="success"
          bsSize="large">
          Create New List
        </Button>
        <h2 style={textStyle}>or</h2>
        <Button
          style={this.props.style}
          bsStyle="info"
          bsSize="large">
          Import an LDDB List
        </Button>
      </div>
    );
  }
}

function select(state) {
  return {
    apiServer: state.apiServer
  }
}

export default connect(select)(NewList);
