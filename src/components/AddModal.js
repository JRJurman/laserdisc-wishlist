import React, { Component } from 'react';
import {  Button, Modal, FormGroup, ControlLabel, Tooltip,
          FormControl, OverlayTrigger, Label } from 'react-bootstrap';

import LaserDisc from './LaserDisc';

import lddbNumberInstructions from '../assets/lddbNumber_instructions.png';

const laserDiscContainerStyle = {
  display: 'flex',
  justifyContent: 'center'
}

const tooltipStyle = {
  opacity: '1.0'
}

class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {title: '', lddbNumber: ''};
  }

  updateTitle(event) {
    this.setState({title: event.target.value});
  }

  updateLDDBNumber(event) {
    this.setState({lddbNumber: event.target.value});
  }

  render() {
    const tooltip = (
      <Tooltip id="add-tooltip" style={tooltipStyle}>
        <img  src={lddbNumberInstructions} alt="LDDB# under the image"
              width="400px" />
      </Tooltip>
    );

    const tooltipComponent = (
      <OverlayTrigger placement="bottom" overlay={tooltip}>
        <Label>?</Label>
      </OverlayTrigger>
    );

    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add LaserDisc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="ldTitle">
            <ControlLabel>LaserDisc Title</ControlLabel>
            <FormControl
              type="text"
              value={this.state.title}
              onChange={this.updateTitle.bind(this)}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup  controlId="ldNumber"
                      validationState={this.state.lddbNumber.length === 5 ? 'success' : 'error'}>
            <ControlLabel>LaserDisc Database Number (#LDDB) {tooltipComponent}</ControlLabel>
            <FormControl
              type="text"
              value={this.state.lddbNumber}
              onChange={this.updateLDDBNumber.bind(this)}
            />
            <FormControl.Feedback />
          </FormGroup>
          <div style={laserDiscContainerStyle}>
            <LaserDisc  title={this.state.title}
                        lddbNumber={this.state.lddbNumber} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
          <Button
            disabled={this.state.lddbNumber.length !== 5}
            onClick={this.props.onEnterLaserDisc.bind(this, this.state.title, this.state.lddbNumber)}
            bsStyle="danger">
            Add LaserDisc
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddModal;
