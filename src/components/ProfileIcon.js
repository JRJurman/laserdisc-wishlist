import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const profileIconStyle = {
  marginLeft: '0.5em',
  cursor: 'pointer',
  padding: '0px',
  borderRadius: '6px',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  borderColor: 'rgba(0,0,0,0)'
}

const profileImageStyle = {
  width: '39px',
  borderRadius: '6px'
}

export class ProfileIcon extends Component {

  render() {
    const style = Object.assign({}, profileIconStyle, this.props.style);
    const image = (
      <img  src={this.props.src} style={profileImageStyle}
            alt={`Logged in as ${this.props.name}`} />
    );

    return (
      <DropdownButton id='profileActions'
                      title={image} style={style}
                      noCaret pullRight>
        <MenuItem header>Logged In as {this.props.name}</MenuItem>
        <MenuItem onClick={this.props.onFBLogout}>Log Out</MenuItem>
      </DropdownButton>
    );
  }
}

export default ProfileIcon;
