import React, { Component } from 'react';
import { connect } from 'react-redux';

import {  fetchList, removeLaserDisc, importLDDBList,
          connectUser, disconnectUser } from '../reducers/apiServer';
import {  enterLaserDisc, openShareModal,
          openAddModal, closeModal } from '../reducers/listState';
import {  login  } from '../reducers/facebookAPI';

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
    const {dispatch, facebookAPI} = this.props;
    const {listId} = this.props.params;
    let userId;
    if (facebookAPI.FB) {
      userId = facebookAPI.FB.getUserID();
    }

    dispatch(fetchList(dispatch, listId, userId));
  }

  onSelectAddLaserDisc() {
    this.props.dispatch(openAddModal());
  }

  onEnterLaserDisc(title, lddbNumber) {
    const {dispatch, facebookAPI} = this.props;
    const {listId} = this.props.params;
    let token, userId;
    if (facebookAPI.FB) {
      userId = facebookAPI.FB.getUserID();
      token = facebookAPI.FB.getAccessToken();
    }

    dispatch(enterLaserDisc(dispatch, listId, title, lddbNumber, userId, token));
  }

  onRemoveLaserDisc(title, lddbNumber) {
    const {dispatch, facebookAPI} = this.props;
    const {listId} = this.props.params;
    let token, userId;
    if (facebookAPI.FB) {
      userId = facebookAPI.FB.getUserID();
      token = facebookAPI.FB.getAccessToken();
    }

    dispatch(removeLaserDisc(dispatch, listId, title, lddbNumber, userId, token));
  }

  onSelectLDDBList() {
    const {dispatch, facebookAPI} = this.props;
    const {listId} = this.props.params;
    let token, userId;
    if (facebookAPI.FB) {
      userId = facebookAPI.FB.getUserID();
      token = facebookAPI.FB.getAccessToken();
    }

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
        dispatch(importLDDBList(dispatch, listId, laserDiscs, userId, token));
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

  onFBLogin() {
    const {dispatch, facebookAPI} = this.props;
    const {listId} = this.props.params;
    if (facebookAPI.FB) {
      dispatch(login(dispatch, facebookAPI.FB, listId));
    }
  }

  onConnect() {
    const {dispatch, facebookAPI} = this.props;
    const {listId} = this.props.params;
    let token, userId;
    if (facebookAPI.FB) {
      userId = facebookAPI.FB.getUserID();
      token = facebookAPI.FB.getAccessToken();
    }

    dispatch(connectUser(dispatch, listId, userId, token));
  }

  onDisconnect() {
    const {dispatch, facebookAPI} = this.props;
    const {listId} = this.props.params;
    let token, userId;
    if (facebookAPI.FB) {
      userId = facebookAPI.FB.getUserID();
      token = facebookAPI.FB.getAccessToken();
    }

    dispatch(disconnectUser(dispatch, listId, userId, token));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.apiServer.list) {
      document.title = `${nextProps.apiServer.list.name} on TallyJacket`
    }
  }

  render() {
    const {apiServer, listState, facebookAPI} = this.props;
    if ((apiServer.list === undefined) ||
        (apiServer.fetchingList !== false)) {
      return (<div/>);
    }

    const laserDiscList = apiServer.list.laserDiscs;

    const reactLaserDiscs = laserDiscList.map( ld => {
      return (<LaserDisc  key={ld.lddbNumber}
                          title={ld.title}
                          lddbNumber={ld.lddbNumber}
                          access={apiServer.list.access}
                          size={listState.size}
                          onRemove={this.onRemoveLaserDisc.bind(this, ld.title, ld.lddbNumber)} />
      );
    });

    // buffer object to left align and keep things centered
    if (reactLaserDiscs.length > 4) {
      reactLaserDiscs.push(<EmptyLaserDisc key='empty-a' size={listState.size} />);
      reactLaserDiscs.push(<EmptyLaserDisc key='empty-b' size={listState.size} />);
      reactLaserDiscs.push(<EmptyLaserDisc key='empty-c' size={listState.size} />);
      reactLaserDiscs.push(<EmptyLaserDisc key='empty-d' size={listState.size} />);
    }

    const modalComponent = (() => {
      switch(this.props.listState.modal) {
        case 'add':
          return (
            <AddModal
              show={true}
              onEnterLaserDisc={this.onEnterLaserDisc.bind(this)}
              closeModal={this.onCloseModal.bind(this)} />
          );
        case 'share':
          return (
            <ShareModal
              show={true}
              onConnect={this.onConnect.bind(this)}
              onDisconnect={this.onDisconnect.bind(this)}
              status={facebookAPI.status}
              access={apiServer.list.access}
              name={facebookAPI.name}
              onFBLogin={this.onFBLogin.bind(this)}
              closeModal={this.onCloseModal.bind(this)} />
          );
        default:
          return (<div />);
      }
    })();

    let listOptions = <div />
    if (apiServer.list.access) {
      listOptions = (
        <ListOptions
          size={listState.size}
          onSelectAddLaserDisc={this.onSelectAddLaserDisc.bind(this)}
          onSelectLDDBList={this.onSelectLDDBList.bind(this)}
          onSelectShare={this.onSelectShare.bind(this)}
        />
      );
    }

    return (
      <div>
        {listOptions}
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
    listState: state.listState,
    facebookAPI: state.facebookAPI
  }
}

export default connect(select)(List);
