import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Modal } from 'react-bootstrap';

import FacebookLoginButton from './FacebookLoginButton';
import ConnectOptions from './ConnectOptions';

class ShareModal extends Component {
  render() {
    let actions = (
      <FacebookLoginButton onClick={this.props.onFBLogin} />
    );
    if (this.props.status === 'connected') {
      actions = (
        <ConnectOptions
            onConnect={this.props.onConnect}
            onDisconnect={this.props.onDisconnect}
            access={this.props.access} />
      );
    }
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Share List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Login to protect your list.</h4>
          To prevent malicious users from modifying your list, log in with
          your Facebook account. You can connect your facebook account to your
          list to prevent modifications from other users, or disconnect to allow
          collaborative editing.<br/><br/>

          <div style={{fontSize:'1.5em'}}>
            {actions}
          </div>

          <br/><br/>
          <h4>Don't need to protect your list?</h4>
          If you don't want to Login with Facebook, that's okay too!
          Just copy the URL below, and share it with the world.<br/><br/>
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
