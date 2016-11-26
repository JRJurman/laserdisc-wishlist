import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createNewList } from '../reducers/apiServer';
import NewList from '../components/NewList';

const mainStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

class Main extends Component {
  onCreateNewList() {
    const {dispatch} = this.props;
    dispatch(createNewList(dispatch));
  }

  render() {
    const style = Object.assign({}, mainStyle, this.props.style);

    return (
      <div style={style}>
        <NewList  disabled={this.props.apiServer.creatingList}
                  onCreateNewList={this.onCreateNewList.bind(this)}/>
      </div>
    );
  }
}

function select(state) {
  return {
    apiServer: state.apiServer
  }
}

export default connect(select)(Main);
