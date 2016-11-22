import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { editListName, saveListName } from '../reducers/listState';

class ListName extends Component {
  constructor(props) {
    super(props);
    this.state = {listName: props.listName};
  }

  updateListName(event) {
    this.setState({listName: event.target.value});
  }

  onNameEdit() {
    const {dispatch} = this.props;
    dispatch(editListName());
  }

  onNameSave(event) {
    const {dispatch, listId} = this.props;
    dispatch(
      saveListName(dispatch, listId, this.state.listName)
    );
  }

  render() {
    const inputStyle = {
      width: '300px',
      fontSize: '25px',
      textAlign: 'center'
    };

    const buttonStyle = {
      width: '300px',
      padding: '5px'
    }

    if (this.props.listState.editingList) {
      return (
        <div>
          <input  style={inputStyle}
                  type='text'
                  value={this.state.listName}
                  onChange={this.updateListName.bind(this)}/>
          <div>
            <Button style={buttonStyle}
                    bsStyle="success"
                    bsSize="large"
                    onClick={this.onNameSave.bind(this)}>
              Rename List
            </Button>
          </div>
        </div>
      );
    }

    return (
      <h2 onClick={this.onNameEdit.bind(this)}>
        {this.props.listName}
      </h2>
    );
  }
}

function select(state) {
  return {
    listState: state.listState
  }
}

export default connect(select)(ListName);
