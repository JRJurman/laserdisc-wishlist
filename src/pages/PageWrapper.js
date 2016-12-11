import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editListName, saveListName } from '../reducers/listState';

import Header from '../components/Header';
import ListTitle from '../components/ListTitle';
import ListInput from '../components/ListInput';
import Footer from '../components/Footer';

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

  render() {
    const {apiServer, listState} = this.props;
    let listTitleComponent = <div />;
    let listInputComponent = <div />;
    if (apiServer.list !== undefined) {
      listInputComponent = (
        <ListInput  defaultValue={apiServer.list.name}
                    saveAction={this.onNameSave.bind(this)}
                    saveIcon='fa fa-floppy-o' />
      );
      listTitleComponent = (
        <ListTitle  listName={apiServer.list.name}
                    onTitleSelect={this.onNameEdit.bind(this)} />
      );
    }


    return (
      <div style={appStyle}>
        <Header>
          {listState.editAction ? listInputComponent : listTitleComponent}
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
    listState: state.listState
  }
}

export default connect(select)(PageWrapper);
