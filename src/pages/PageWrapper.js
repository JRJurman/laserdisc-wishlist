import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createNewList } from '../reducers/apiServer';
import { editListName, saveListName } from '../reducers/listState';
import { initAPI, login, logout } from '../reducers/facebookAPI';

import Header from '../components/Header';
import ListTitle from '../components/ListTitle';
import ListInput from '../components/ListInput';
import Footer from '../components/Footer';
import FacebookAuth from '../components/FacebookAuth';
import FacebookLoginButton from '../components/FacebookLoginButton';
import ProfileIcon from '../components/ProfileIcon';
import NewList from '../components/NewList';

const appStyle = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%'
};

const bodyStyle = {
  flex: '1 1'
};

class PageWrapper extends Component {

  onNameEdit() {
    const {dispatch} = this.props;
    dispatch(editListName());
  }

  onNameSave(listName) {
    const {dispatch} = this.props;
    const {listId} = this.props.params;
    dispatch(saveListName(dispatch, listId, listName));
  }

  loadFacebookAPI(FB) {
    const {dispatch} = this.props;
    dispatch(initAPI(dispatch, FB));
  }

  onFBLogin() {
    const {dispatch, facebookAPI} = this.props;
    if (facebookAPI.FB) {
      dispatch(login(dispatch, facebookAPI.FB));
    }
  }

  onFBLogout() {
    const {dispatch, facebookAPI} = this.props;
    if (facebookAPI.FB) {
      dispatch(logout(facebookAPI.FB));
    }
  }

  onCreateNewList() {
    const {dispatch} = this.props;
    dispatch(createNewList(dispatch));
  }

  render() {
    const {apiServer, listState, facebookAPI} = this.props;
    let headerAction = <div />
    if (apiServer.list !== undefined) {
      if (listState.editAction) {
        headerAction = (
          <ListInput  defaultValue={apiServer.list.name}
                      saveAction={this.onNameSave.bind(this)}
                      saveIcon='fa fa-floppy-o' />
        );
      } else {
        headerAction = (
          <ListTitle  listName={apiServer.list.name}
                      onTitleSelect={this.onNameEdit.bind(this)} />
        );
      }
    } else {
      headerAction = (
        <NewList  style={{padding:'5px 10px'}}
                  disabled={apiServer.creatingList}
                  onCreateNewList={this.onCreateNewList.bind(this)}/>
      )
    }

    let facebookLogin = <div />;
    if (facebookAPI.FB) {
      if (!!facebookAPI.picture) {
        facebookLogin = (
          <ProfileIcon  src={facebookAPI.picture}
                        name={facebookAPI.name}
                        onFBLogout={this.onFBLogout.bind(this)} />
        );
      } else {
        facebookLogin = (
          <FacebookLoginButton  style={{marginLeft:'0.5em'}}
                                iconOnly={true}
                                onClick={this.onFBLogin.bind(this)} />
        );
      }
    }

    return (
      <div style={appStyle}>
        <FacebookAuth loadFacebookAPI={this.loadFacebookAPI.bind(this)} />
        <Header>
          {headerAction}
          {facebookLogin}
        </Header>
        <div style={bodyStyle}>
          {this.props.children}
        </div>
        <Footer />
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

export default connect(select)(PageWrapper);
