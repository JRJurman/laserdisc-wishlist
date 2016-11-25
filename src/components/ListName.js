import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

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

  render() {

    let titleDiv = (
      <h2 style={listTitleStyle}
          onClick={this.props.onNameEdit}>
        {this.props.listName}
      </h2>
    );
    if (this.props.editingList) {
      titleDiv = (
        <div>
          <input  style={inputStyle} type='text'
                  value={this.state.listName}
                  onChange={this.updateListName.bind(this)}/>
          <div>
            <Button style={buttonStyle}
                    bsStyle="success"
                    bsSize="large"
                    onClick={this.props.onNameSave.bind(this, this.state.listName)}>
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

export default ListName;
