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
    const {lddbNumber, title} = this.props;

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
        <Panel  header={title} bsStyle="primary"
                style={laserdiscPanelStyle}>
          <a  href={`http://www.lddb.com/laserdisc/${this.props.lddbNumber}/`}
              target="_blank">
            <img  src={thumbPage}
                  alt={`http://www.lddb.com/laserdisc/${this.props.lddbNumber}/`}
                  style={laserdiscCoverStyle}/>
          </a>
        </Panel>
        <Button bsStyle="danger" style={removeButtonStyle}
                onClick={this.props.onRemove}>
          Remove From List
        </Button>
      </div>
    );
  }
}

export default Laserdisc;
