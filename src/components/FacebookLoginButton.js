import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

const fbButtonStyle = {
  backgroundColor: '#4966b6',
  borderColor: '#4966b6',
  color: 'white',
  fontSize: '1em'
}

const iconOnlyStyle = {
  padding: '0px 5px'
}

const hoverStyle = (<style>
  .facebook-login-button:hover {`{
    background: linear-gradient(#5b7bd5, #4864b1);
    border-bottom-color: #365899;
    border-left-color: #4961a8;
    border-right-color: #4961a8;
    border-top-color: #5874c3;
    box-shadow: inset 0 1px 0 #607fd6;}`
  }
</style>);

export class FacebookLoginButton extends Component {

  render() {
    const fbIcon = (
      <i  className="fa fa-facebook-official"
          aria-hidden="true" />
    );

    const style = (this.props.iconOnly ?
      Object.assign({}, fbButtonStyle, iconOnlyStyle, this.props.style) :
      Object.assign({}, fbButtonStyle, this.props.style));

    const text = (this.props.iconOnly ?
      <span>{fbIcon}</span> :
      <span>{fbIcon} Log In</span>
    );

    return (
      <span>
        {hoverStyle}
        <Button className="facebook-login-button"
                style={style} bsSize="large"
                onClick={this.props.onClick}>
           {text}
        </Button>
      </span>
    );
  }
}

export default FacebookLoginButton;
