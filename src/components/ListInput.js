import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

const inputStyle = {
  width: '14em',
  textAlign: 'right',
  fontWeight: 'bold',
  lineHeight: '1.1',
  color: '#333333',
  paddingRight: '0.4em',
  paddingTop: '4px',
  border: '0px'
}

const buttonStyle = {
  padding: '0px 5px',
  fontSize: '1em'
}

const rightButtonStyle = Object.assign({}, buttonStyle, {
  borderTopLeftRadius: '0px',
  borderBottomLeftRadius: '0px'
});

const containerStyle = {
  display: 'flex',
  overflow: 'visible'
}

class ListInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue ? props.defaultValue : ''
    };
  }

  updateInputValue(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div style={containerStyle}>
        <input
          style={inputStyle} type='text'
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.updateInputValue.bind(this)} />
        <Button style={rightButtonStyle}
                bsStyle="warning"
                bsSize="large"
                onClick={this.props.saveAction.bind(this, this.state.value)}>
          <i className={this.props.saveIcon} aria-hidden="true" />
        </Button>
      </div>
    );
  }
}

export default ListInput;
