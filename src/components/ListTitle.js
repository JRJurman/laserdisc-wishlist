import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

const buttonStyle = {
  padding: '0px 5px',
  fontSize: '1em'
}

const rightButtonStyle = Object.assign({}, buttonStyle, {
  borderTopLeftRadius: '0px',
  borderBottomLeftRadius: '0px'
});

const listTitleStyle = {
  fontWeight: 'bold',
  lineHeight: '1.1',
  color: 'inherit',
  paddingRight: '0.4em'
};

const containerStyle = {
  display: 'flex',
  overflow: 'visible',
  alignItems: 'center',
  borderRadius: '10px',
  border: '#d9534f solid 1px',
  paddingLeft: '0.3em'
}

class ListTitle extends Component {
  render() {

    const titleStyle = Object.assign({}, listTitleStyle, {
      cursor: (this.props.access ? 'pointer' : 'default')
    });

    let onClick = (()=>{});
    let editAction = <div style={{height:'39px'}} />
    if (this.props.access) {
      onClick = this.props.onTitleSelect;
      editAction = (
        <Button style={rightButtonStyle}
              disabled={this.props.disabled}
              bsStyle="danger"
              bsSize="large"
              onClick={onClick} >
          <i className="fa fa-pencil" aria-hidden="true" />
        </Button>
      );
    }
    return (
      <span style={containerStyle}>
        <span style={titleStyle}
              onClick={onClick}>
          {this.props.listName}
        </span>
        {editAction}
      </span>
    );
  }
}

export default ListTitle;
