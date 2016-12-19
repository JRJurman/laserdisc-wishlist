import React, { Component } from 'react';
import { connect } from 'react-redux';

import {  fetchList, removeLaserDisc,
          importLDDBList } from '../reducers/apiServer';
import {  enterLaserDisc, openShareModal,
          openAddModal, closeModal } from '../reducers/listState';

import LaserDisc from '../components/LaserDisc';
import EmptyLaserDisc from '../components/EmptyLaserDisc';
import ListOptions from '../components/ListOptions';
import AddModal from '../components/AddModal';
import ShareModal from '../components/ShareModal';

const laserDiscContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap'
}

class List extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchList(dispatch, this.props.params.listId));
  }

  onSelectAddLaserDisc() {
    this.props.dispatch(openAddModal());
  }

  onEnterLaserDisc(title, lddbNumber) {
    const {dispatch} = this.props;
    const {listId} = this.props.params;
    dispatch(enterLaserDisc(dispatch, listId, title, lddbNumber));
  }

  onRemoveLaserDisc(title, lddbNumber) {
    const {dispatch} = this.props;
    const {listId} = this.props.params;
    dispatch(removeLaserDisc(dispatch, listId, title, lddbNumber));
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
        // generate laserDisc objects to add
        const laserDiscs = lddbLines.slice(1).map(line => {
          return line.split('\t').reduce((laserDisc, field, index) => {
            const ldCopy = Object.assign({}, laserDisc);
            ldCopy[lddbHeaders[index]] = field;
            return ldCopy;
          }, {});
        });
        dispatch(importLDDBList(dispatch, listId, laserDiscs));
      };
      reader.readAsText(lddbFile);
    });
    filePicker.click();
  }

  onSelectShare() {
    const {dispatch} = this.props;
    dispatch(openShareModal());
  }

  onCloseModal() {
    const {dispatch} = this.props;
    dispatch(closeModal());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.apiServer.list) {
      document.title = `${nextProps.apiServer.list.name} on My LaserDisc`
    }
  }

  render() {
    if ((this.props.apiServer.list === undefined) ||
        (this.props.apiServer.fetchingList !== false)) {
      return (<div/>);
    }

    const laserDiscList = this.props.apiServer.list.laserDiscs;

    const reactLaserDiscs = laserDiscList.map( ld => {
      return (<LaserDisc  key={ld.lddbNumber}
                          title={ld.title}
                          lddbNumber={ld.lddbNumber}
                          onRemove={this.onRemoveLaserDisc.bind(this, ld.title, ld.lddbNumber)} />
      );
    });

    // buffer object to left align and keep things centered
    if (reactLaserDiscs.length > 3) {
      reactLaserDiscs.push(<EmptyLaserDisc key='empty-a'/>);
      reactLaserDiscs.push(<EmptyLaserDisc key='empty-b'/>);
      reactLaserDiscs.push(<EmptyLaserDisc key='empty-c'/>);
    }

    const modalComponent = (() => {
      switch(this.props.listState.modal) {
        case 'add':
          return (<AddModal
                            show={true}
                            onEnterLaserDisc={this.onEnterLaserDisc.bind(this)}
                            closeModal={this.onCloseModal.bind(this)} />);
        case 'share':
          return (<ShareModal
                            show={true}
                            closeModal={this.onCloseModal.bind(this)} />);
        default:
          return (<div />);
      }
    })()

    return (
      <div>
        <ListOptions  onSelectAddLaserDisc={this.onSelectAddLaserDisc.bind(this)}
                      onSelectLDDBList={this.onSelectLDDBList.bind(this)}
                      onSelectShare={this.onSelectShare.bind(this)} />
        <div style={laserDiscContainerStyle}>
          {reactLaserDiscs}
        </div>
        {modalComponent}
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
