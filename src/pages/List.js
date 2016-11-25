import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchList, removeLaserdisc } from '../reducers/apiServer';
import {  editListName, saveListName, addingLaserdisc,
          finishAddingLaserdisc } from '../reducers/listState';

import ListName from '../components/ListName';
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

  onNameEdit() {
    const {dispatch} = this.props;
    dispatch(editListName());
  }

  onNameSave(listName) {
    const {dispatch} = this.props;
    dispatch(saveListName(dispatch, this.props.params.listId, listName));
  }

  onSelectAddLaserdisc() {
    this.props.dispatch(addingLaserdisc());
  }

  onAddLaserdisc(title, lddbNumber) {
    const {dispatch} = this.props;
    dispatch(
      finishAddingLaserdisc(dispatch, this.props.params.listId, title, lddbNumber)
    );
  }

  onRemoveLaserdisc(title, lddbNumber) {
    const {dispatch} = this.props;
    const {listId} = this.props.params;
    dispatch(removeLaserdisc(dispatch, listId, title, lddbNumber));
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

    if (reactLaserdiscs.length > 3) {
      reactLaserdiscs.push(<EmptyLaserdisc key='empty-a'/>);
      reactLaserdiscs.push(<EmptyLaserdisc key='empty-b'/>);
      reactLaserdiscs.push(<EmptyLaserdisc key='empty-c'/>);
    }

    return (
      <div>
        <AddLaserdiscs  addingLaserdisc={this.props.listState.addingLaserdisc}
                        onSelectAddLaserdisc={this.onSelectAddLaserdisc.bind(this)}
                        onAddLaserdisc={this.onAddLaserdisc.bind(this)} />
        <ListName listName={this.props.apiServer.list.name}
                  onNameEdit={this.onNameEdit.bind(this)}
                  onNameSave={this.onNameSave.bind(this)}
                  editingList={this.props.listState.editingList} />
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
