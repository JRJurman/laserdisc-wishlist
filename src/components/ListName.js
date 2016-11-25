import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { editListName, saveListName } from '../reducers/listState';

const inputStyle = {
  marginTop: '1em',
  width: '500px',
  fontSize: '1.8em',
  textAlign: 'center'
};

const buttonStyle = {
  width: '500px',
  padding: '5px',
  marginBottom: '1em',
}

const listTitleStyle = {
  margin: 'auto',
  paddingTop: '0.8em',
  cursor: 'pointer',
  width: '500px'
};

const containerStyle = {
  height: '6em',
  marginBottom: '20px',
  overflow: 'visible'
}

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

  onNameSave() {
    const {dispatch, listId} = this.props;
    dispatch(
      saveListName(dispatch, listId, this.state.listName)
    );
  }

  render() {

    let titleDiv = (
      <h2 style={listTitleStyle}
          onClick={this.onNameEdit.bind(this)}>
        {this.props.listName}
      </h2>
    );
    if (this.props.listState.editingList) {
      titleDiv = (
        <div>
          <input  style={inputStyle} type='text'
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
      <div style={containerStyle}>
        {titleDiv}
      </div>
    );
  }
}

function select(state) {
  return {
    listState: state.listState
  }
}

export default connect(select)(ListName);
