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
  paddingRight: '0.4em',
  paddingTop: '4px',
  cursor: 'pointer'
};

const containerStyle = {
  display: 'flex',
  overflow: 'visible',
  marginTop: '17px'
}

class ListTitle extends Component {
  render() {

    const titleStyle = Object.assign({}, listTitleStyle, {
      cursor: (this.props.disabled ? 'default' : 'pointer')
    });

    return (
      <div style={containerStyle}>
        <span style={titleStyle}
              onClick={this.props.onTitleSelect}>
          {this.props.listName}
        </span>
        <Button style={rightButtonStyle}
                disabled={this.props.disabled}
                bsStyle="success"
                bsSize="large"
                onClick={this.props.onTitleSelect}>
          <i className="fa fa-pencil" aria-hidden="true" />
        </Button>
      </div>
    );
  }
}

export default ListTitle;
