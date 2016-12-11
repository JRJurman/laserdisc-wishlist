import React, { Component } from 'react';
import { connect } from 'react-redux';

import {  fetchList, removeLaserdisc,
          importLDDBList } from '../reducers/apiServer';
import { addingLaserdisc, finishAddingLaserdisc } from '../reducers/listState';

import Laserdisc from '../components/Laserdisc';
import EmptyLaserdisc from '../components/EmptyLaserdisc';
import AddLaserdiscs from '../components/AddLaserdiscs';

const laserdiscContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap'
}

class List extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchList(dispatch, this.props.params.listId));
  }

  onSelectAddLaserdisc() {
    this.props.dispatch(addingLaserdisc());
  }

  onAddLaserdisc(title, lddbNumber) {
    const {dispatch} = this.props;
    const {listId} = this.props.params;
    dispatch(finishAddingLaserdisc(dispatch, listId, title, lddbNumber));
  }

  onRemoveLaserdisc(title, lddbNumber) {
    const {dispatch} = this.props;
    const {listId} = this.props.params;
    dispatch(removeLaserdisc(dispatch, listId, title, lddbNumber));
  }

  onSelectLDDBList() {
    const {dispatch} = this.props;
    const {listId} = this.props.params;
    const filePicker = document.createElement('input');
    filePicker.type = 'file';
    filePicker.accept=".csv"
    filePicker.addEventListener('change', evt => {
      const lddbFile = evt.target.files[0];
      var reader = new FileReader();
      reader.onload = function(event) {
        // process lddb csv file
        const lddbLines = event.target.result.trim().split('\n');
        // get the headers first
        const lddbHeaders = lddbLines[0].split('\t');
        // generate laserdisc objects to add
        const laserdiscs = lddbLines.slice(1).map(line => {
          return line.split('\t').reduce((laserdisc, field, index) => {
            const ldCopy = Object.assign({}, laserdisc);
            ldCopy[lddbHeaders[index]] = field;
            return ldCopy;
          }, {});
        });
        dispatch(importLDDBList(dispatch, listId, laserdiscs));
      };
      reader.readAsText(lddbFile);
    });
    filePicker.click();
  }

  render() {
    if ((this.props.apiServer.list === undefined) ||
        (this.props.apiServer.fetchingList !== false)) {
      return (<div/>);
    }

    const laserdiscList = this.props.apiServer.list.laserdiscs;

    const reactLaserdiscs = laserdiscList.map( ld => {
      return (<Laserdisc  key={ld.lddbNumber}
                          title={ld.title}
                          lddbNumber={ld.lddbNumber}
                          onRemove={this.onRemoveLaserdisc.bind(this, ld.title, ld.lddbNumber)} />
      );
    });

    // buffer object to left align and keep things centered
    if (reactLaserdiscs.length > 3) {
      reactLaserdiscs.push(<EmptyLaserdisc key='empty-a'/>);
      reactLaserdiscs.push(<EmptyLaserdisc key='empty-b'/>);
      reactLaserdiscs.push(<EmptyLaserdisc key='empty-c'/>);
    }

    const addLaserdiscs = this.props.apiServer.list.locked ? (<div />) : (
      <AddLaserdiscs  addingLaserdisc={this.props.listState.addingLaserdisc}
                      onSelectAddLaserdisc={this.onSelectAddLaserdisc.bind(this)}
                      onAddLaserdisc={this.onAddLaserdisc.bind(this)}
                      onSelectLDDBList={this.onSelectLDDBList.bind(this)} />
    );

    return (
      <div>
        {addLaserdiscs}
        <div style={laserdiscContainerStyle}>
          {reactLaserdiscs}
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    apiServer: state.apiServer,
    listState: state.listState
  }
}

export default connect(select)(List);
