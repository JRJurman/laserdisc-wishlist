import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createNewList } from '../reducers/apiServer';

export class NewListButton extends Component {
  onCreateNewList() {
    const {dispatch} = this.props;
    dispatch(createNewList(dispatch));
  }

  render() {
    return (
      <div>
        <Button
          disabled={this.props.apiServer.creatingList}
          onClick={this.onCreateNewList.bind(this)}
          bsStyle="success">
          Create New List
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

export default connect(select)(NewListButton);
