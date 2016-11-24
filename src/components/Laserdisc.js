import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';

const laserdiscPanelStyle = {
  width: '250px',
  marginBottom: '0px'
}

const laserdiscCoverStyle = {
  cursor: 'pointer'
}

const removeButtonStyle = {
  width: '250px',
  display: 'block'
}

const componentStyle = {
  margin: '1em'
}


export class Laserdisc extends Component {
  onPanelSelect() {
    const lddbPage = `http://www.lddb.com/laserdisc/${this.props.lddbNumber}/`;
    window.open(lddbPage,'mywindow');
  }

  render() {
    const {lddbNumber} = this.props;

    let lddbIntNumber = parseInt(lddbNumber, 10);
    if ((lddbIntNumber % 100) === 0) {
      lddbIntNumber -= 1;
    }
    const lddbLowValue = (Math.floor(lddbIntNumber / 100) * 100) + 1;
    const lddbHighValue = (Math.floor(lddbIntNumber / 100) * 100) + 100;

    const lddbLowString = '0'.repeat( 5 - lddbLowValue.toString().length).concat(lddbLowValue.toString());
    const lddbHighString = '0'.repeat( 5 - lddbHighValue.toString().length).concat(lddbHighValue.toString());

    const thumbPage = `http://www.lddb.com/cover/ld/${lddbLowString}-${lddbHighString}/thumb/${lddbNumber}.jpg`;

    const style = Object.assign({}, componentStyle, this.props.style);

    return (
      <div style={style}>
        <Panel  header={this.props.title} bsStyle="primary"
                style={laserdiscPanelStyle}>
          <img  onClick={this.onPanelSelect.bind(this)}
                src={thumbPage}
                alt={`${this.props.title}-cover`}
                style={laserdiscCoverStyle}/>
        </Panel>
        <Button bsStyle="danger" style={removeButtonStyle}>
          Remove From List
        </Button>
      </div>
    );
  }
}

export default Laserdisc;
