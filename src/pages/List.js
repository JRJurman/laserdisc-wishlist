import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchList } from '../reducers/apiServer';

class List extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchList(dispatch, this.props.params.listId));
  }

  render() {
    console.log(this.props.apiServer.list)
    if (this.props.apiServer.fetchingList !== false) {
      return <div/>
    }

    return (
      <div>
        <h2>{this.props.apiServer.list.name}</h2>
      </div>
    );
  }
}

function select(state) {
  return {
    apiServer: state.apiServer
  }
}

export default connect(select)(List);
