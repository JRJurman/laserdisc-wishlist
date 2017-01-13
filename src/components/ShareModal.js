import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Modal } from 'react-bootstrap';

import FacebookLoginButton from './FacebookLoginButton';
import ConnectOptions from './ConnectOptions';

class ShareModal extends Component {
  render() {
    let actions = (
      <FacebookLoginButton onClick={this.props.onFBLogin} />
    );
    let header = 'Login to protect your list.';
    if (this.props.status === 'connected') {
      actions = (
        <ConnectOptions
            onConnect={this.props.onConnect}
            onDisconnect={this.props.onDisconnect}
            access={this.props.access} />
      );
      header = 'Lock to protect your list';
    }
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Share List</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <FormGroup validationState="success">
            <FormControl readOnly="true" type="text" style={{textAlign:'center'}}
              value={window.location}>
            </FormControl>
          </FormGroup>

          <h4>{header}</h4>
          To prevent malicious users from modifying your list, log in with
          your Facebook account. You can lock your list so only you can edit
          them, or unlock to allow collaborative editing.
          <br/><br/>

          <div style={{fontSize:'1.5em', textAlign:'center'}}>
            {actions}
          </div>
          <br/><br/>

          <h4>Don't need to protect your list?</h4>
          If you don't want to Login with Facebook or lock your list, that's okay too!
          Just copy the URL above, and share it with the world.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ShareModal;
