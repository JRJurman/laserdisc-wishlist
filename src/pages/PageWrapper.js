import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editListName, saveListName } from '../reducers/listState';

import Header from '../components/Header';
import ListName from '../components/ListName';
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
    dispatch(saveListName(dispatch, this.props.params.listId, listName));
  }

  render() {
    let listNameComponent = <div />
    if (this.props.apiServer.list) {
      listNameComponent = <ListName listName={this.props.apiServer.list.name}
                onNameEdit={this.onNameEdit.bind(this)}
                onNameSave={this.onNameSave.bind(this)}
                editingList={this.props.listState.editingList} />
    }
    return (
      <div style={appStyle}>
        <Header>
          {listNameComponent}
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
