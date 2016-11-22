import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchList } from '../reducers/apiServer';

import ListName from '../components/ListName';
import Laserdisc from '../components/Laserdisc';

class List extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchList(dispatch, this.props.params.listId));
  }

  render() {
    if (this.props.apiServer.fetchingList !== false) {
      return (<div/>);
    }

    return (
      <div>
        <ListName listId={this.props.params.listId}
                  listName={this.props.apiServer.list.name} />
        <Laserdisc title='Adventures In Babysitting' lddbNumber={'00798'} />
        <Laserdisc title='Howard the Duck' lddbNumber={'02019'} />

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
