import React, { Component } from 'react';
import { Panel, Button, Label } from 'react-bootstrap';

import notFoundImage from '../assets/turtle.jpg';

const hiddenPanelStyle = {
  color: '#f0ad4e'
}

const laserDiscPanelStyle = {
  marginBottom: '0px',
  borderRadius: '10px 10px 0px 0px'
}

const removeButtonStyle = {
  width: '100%',
  height: '40px',
  display: 'block',
  borderRadius: '0px 0px 10px 10px'
}

const hiddenLabelStyle = {
  color: '#d9534f'
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

    /* thumbnail logic */
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
    }
    /* end thumbnail logic */

    const laserDiscCoverStyle = {
      cursor: 'pointer',
      margin: '10px'
    }
    const componentStyle = {
      textAlign: 'center'
    }
    const hoverStyle = {
      position: 'absolute'
    }

    if (this.props.size < 4) {
      laserDiscCoverStyle.width = '130px';
      componentStyle.width = '162px';
      hoverStyle.width = '162px';
      componentStyle.margin = '0.25em';
    }
    else if (this.props.size < 5) {
      laserDiscCoverStyle.width = '165px';
      componentStyle.width = '190px';
      hoverStyle.width = '190px';
      componentStyle.margin = '0.25em';
    } else {
      componentStyle.width = '232px';
      hoverStyle.width = '232px';
      componentStyle.margin = '0.5em';
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
        <Panel  bsStyle="warning"
                style={laserDiscPanelStyle}>
          <div className="hover-panel panel-heading label-warning" style={hoverStyle}>{panelHeader}</div>
          <div className="panel-heading label-warning">{panelHeader}</div>
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
