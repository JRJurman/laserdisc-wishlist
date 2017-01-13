import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import exportInstructions from '../assets/export_instructions.png';

const controlStyle = {
  textAlign: 'center',
  padding: '1em'
}

class ImportModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Share List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Export your list as a CSV from LaserDisc Database, and import here!
          <img width="100%" src={exportInstructions} alt="Show Export Controls; Select CSV; Export" />
          <div style={controlStyle}>
            <Button bsSize="large" bsStyle="danger"
                    onClick={this.props.onImportLDDBList}>
                      Import List
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ImportModal;
