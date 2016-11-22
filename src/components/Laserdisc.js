import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';

const laserdiscPanelStyle = {
  width: '250px',
  cursor: 'pointer',
  marginBottom: '0px'
}
const removeButtonStyle = {
  width: '250px',
  display: 'block'
}

export class Laserdisc extends Component {
  onPanelSelect() {
    const lddbPage = `http://www.lddb.com/laserdisc/${this.props.lddbNumber}/`;
    window.open(lddbPage,'mywindow');
  }

  render() {
    const {lddbNumber} = this.props;

    // in case we hit the edge case that a number is on a 100
    let lddbCoverValue = parseInt(lddbNumber, 10);
    if (lddbCoverValue % 100 === 0) {
      lddbCoverValue -= 1;
    }
    let lddbCoverString = lddbCoverValue.toString();
    lddbCoverString = '0'.repeat( 5 - lddbCoverValue.toString().length).concat(lddbCoverString);

    const lowCover = lddbCoverString.split('').map((digit, index) => {
      if (index > 2) return parseInt(index, 10) % 3;
      else return digit;
    }).join('');
    const highCover = lddbCoverString.split('').map((digit, index) => {
      if (index === 2) return parseInt(digit, 10) + 1
      if (index > 2) return '0';
      else return digit;
    }).join('');

    const thumbPage = `http://www.lddb.com/cover/ld/${lowCover}-${highCover}/thumb/${lddbNumber}.jpg`;

    return (
      <div>
        <Panel  header={this.props.title} bsStyle="primary"
                style={laserdiscPanelStyle}
                onClick={this.onPanelSelect.bind(this)}>
          <div><img src={thumbPage}/></div>
        </Panel>
        <Button bsStyle="danger" style={removeButtonStyle}>
          Remove From List
        </Button>
      </div>
    );
  }
}

export default Laserdisc;
