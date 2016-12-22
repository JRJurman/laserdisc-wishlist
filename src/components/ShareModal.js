import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Modal } from 'react-bootstrap';

import FacebookLoginButton from './FacebookLoginButton';

class ShareModal extends Component {
  render() {
    let facebookPrompt = <div />
    if(this.props.status === 'connected') {
      facebookPrompt = (
        <div>
          <h4>Hello {this.props.name}</h4>
          To prevent malicious users from modifying your list, we've
          associated your account with this list. Only you will be able
          to edit this list. You can share this list with peace of mind.
          <br/><br/>
        </div>
      )
    } else {
      facebookPrompt = (
        <div>
          <h4>Login to protect your list.</h4>
          To prevent malicious users from modifying your list, log in with
          your Facebook account. After logging in, only you will be able to
          rename the list, add LaserDiscs, or import to this list.<br/><br/>

          <FacebookLoginButton  onClick={this.props.onFBLogin}
                                style={{fontSize:'1.5em'}} />
          <br/><br/>
          <h4>Don't need to protect your list?</h4>
          If you don't want to Login with Facebook, that's okay too!
          Just copy the URL below, and share it with the world.<br/><br/>
        </div>
      );
    }
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Share List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {facebookPrompt}
          <FormGroup validationState="success">
            <FormControl readOnly="true" type="text" value={window.location}>
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ShareModal;
