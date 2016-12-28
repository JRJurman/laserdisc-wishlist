import React, { Component } from 'react';
import { Panel, Button, Label } from 'react-bootstrap';

import notFoundImage from '../assets/turtle.jpg';

const hiddenPanelStyle = {
  color: '#f0ad4e'
}

const laserDiscPanelStyle = {
  width: '250px',
  marginBottom: '0px',
  borderTopRightRadius: '10px',
  borderTopLeftRadius: '10px',
  borderBottomRightRadius: '0px',
  borderBottomLeftRadius: '0px'
}

const laserDiscCoverStyle = {
  cursor: 'pointer'
}

const removeButtonStyle = {
  width: '250px',
  height: '40px',
  display: 'block',
  borderTopRightRadius: '0px',
  borderTopLeftRadius: '0px',
  borderBottomRightRadius: '10px',
  borderBottomLeftRadius: '10px'
}

const hiddenLabelStyle = {
  color: '#d9534f'
}

const componentStyle = {
  margin: '1em',
  textAlign: 'center'
}


export class LaserDisc extends Component {
  onPanelSelect() {
    const lddbPage = `http://www.lddb.com/laserdisc/${this.props.lddbNumber}/`;
    window.open(lddbPage,'mywindow');
  }

  onImageNotFound({target}) {
    target.src = notFoundImage;
    target.style.opacity = 0.5;
  }

  render() {
    const {lddbNumber, title} = this.props;

    let thumbPage = notFoundImage;
    if (lddbNumber.length === 5) {
      // determine the LaserDisc shard that contains the thumbnail
      let lddbIntNumber = parseInt(lddbNumber, 10);
      if ((lddbIntNumber % 100) === 0) {
        lddbIntNumber -= 1;
      }
      const lddbLowValue = (Math.floor(lddbIntNumber / 100) * 100) + 1;
      const lddbHighValue = (Math.floor(lddbIntNumber / 100) * 100) + 100;

      const lddbLowString = '0'.repeat( 5 - lddbLowValue.toString().length).concat(lddbLowValue.toString());
      const lddbHighString = '0'.repeat( 5 - lddbHighValue.toString().length).concat(lddbHighValue.toString());

      thumbPage = `http://www.lddb.com/cover/ld/${lddbLowString}-${lddbHighString}/thumb/${lddbNumber}.jpg`;
      // end thumbnail logic
    }

    const style = Object.assign({}, componentStyle, this.props.style);
    const panelHeader = title ? (title) : (<span style={hiddenPanelStyle}>{lddbNumber}</span>);
    let removeButton;
    if (this.props.onRemove && this.props.access) {
      removeButton = (
        <Button bsStyle="danger" style={removeButtonStyle}
                onClick={this.props.onRemove}>
          Remove From List
        </Button>
      );
    } else {
      const labelStyle = Object.assign({}, removeButtonStyle, hiddenLabelStyle);
      removeButton = (
        <Label bsStyle="danger" style={labelStyle}>
          {this.props.lddbNumber}
        </Label>
      );
    }
    return (
      <div style={style}>
        <Panel  header={panelHeader}
                bsStyle="warning"
                style={laserDiscPanelStyle}>
          <a  href={`http://www.lddb.com/laserdisc/${this.props.lddbNumber}/`}
              target="_blank">
            <img  src={thumbPage}
                  alt={`http://www.lddb.com/laserdisc/${this.props.lddbNumber}/`}
                  style={laserDiscCoverStyle}
                  onError={this.onImageNotFound} />
          </a>
        </Panel>
        {removeButton}
      </div>
    );
  }
}

export default LaserDisc;
