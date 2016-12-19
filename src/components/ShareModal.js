import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Modal } from 'react-bootstrap';

class ShareModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Share List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Login to protect your list.</h4>
          To prevent malicious users from modifying your list, log in with
          your Facebook account. After logging in, only you will be able to
          rename the list, add LaserDiscs, or import to this list.<br/><br/>

          <div  className="fb-login-button" data-max-rows="1"
                data-size="xlarge" data-show-faces="false"
                data-auto-logout-link="false"></div>

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
