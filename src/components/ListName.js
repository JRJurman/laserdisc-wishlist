import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

const inputStyle = {
  width: '14em',
  textAlign: 'right',
  paddingRight: '0.4em',
  color: '#333333',
  fontSize: '0.85em'
};

const buttonStyle = {
  padding: '0px 5px',
  fontSize: '1em',
  marginBottom: '4px',
  borderTopLeftRadius: '0px',
  borderBottomLeftRadius: '0px'
}

const listTitleStyle = {
  fontWeight: 'bold',
  lineHeight: '1.1',
  color: 'inherit',
  paddingRight: '0.4em',
  cursor: 'pointer'
};

const containerStyle = {
  overflow: 'visible',
  marginTop: '17px'
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
      <div onClick={this.props.onNameEdit}>
        <span style={listTitleStyle}>
          {this.props.listName}
        </span>
        <Button style={buttonStyle}
                bsStyle="success"
                bsSize="large"
                onClick={this.props.onNameEdit}>
          <i className="fa fa-pencil" aria-hidden="true" />
        </Button>
      </div>
    );
    if (this.props.editingList) {
      titleDiv = (
        <div>
          <input  style={inputStyle} type='text'
                  value={this.state.listName}
                  onChange={this.updateListName.bind(this)}/>
          <Button style={buttonStyle}
                  bsStyle="success"
                  bsSize="large"
                  onClick={this.props.onNameSave.bind(this, this.state.listName)}>
            <i className="fa fa-floppy-o" aria-hidden="true" />
          </Button>
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
