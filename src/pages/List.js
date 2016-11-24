import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchList } from '../reducers/apiServer';

import ListName from '../components/ListName';
import Laserdisc from '../components/Laserdisc';
import EmptyLaserdisc from '../components/EmptyLaserdisc';
import AddLaserdiscButton from '../components/AddLaserdiscButton';
import ImportListButton from '../components/ImportListButton';

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const laserdiscContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap'
}

const textStyle = {
  margin: '0.5em'
}

class List extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchList(dispatch, this.props.params.listId));
  }

  render() {
    if (this.props.apiServer.fetchingList !== false) {
      return (<div/>);
    }

    const laserdiscList = [
      {title:'Adventures In Babysitting', lddbNumber:'00798'},
      {title:'Howard the Duck', lddbNumber:'02019'},
      {title:'The Nightmare Before Christmas', lddbNumber:'14601'},
      {title:'Things to Do in Denver When You\'re Dead', lddbNumber:'07200'},
      {title:'Phantom of the Paradise', lddbNumber:'24666'},
      {title:'Transformers: The Movie', lddbNumber:'00171'},
      {title:'Bubblegum Crisis #1: Ep. 1-3', lddbNumber:'08990'}
    ];

    const reactLaserdiscs = laserdiscList.map( ld => {
      return (<Laserdisc  key={ld.lddbNumber}
                          title={ld.title}
                          lddbNumber={ld.lddbNumber} />);
    });

    if (reactLaserdiscs.length > 3) {
      reactLaserdiscs.push(<EmptyLaserdisc key='empty-a'/>);
      reactLaserdiscs.push(<EmptyLaserdisc key='empty-b'/>);
      reactLaserdiscs.push(<EmptyLaserdisc key='empty-c'/>);
    }

    return (
      <div>
        <div style={buttonContainerStyle}>
          <AddLaserdiscButton />
          <h2 style={textStyle}>or</h2>
          <ImportListButton />
        </div>
        <ListName listId={this.props.params.listId}
                  listName={this.props.apiServer.list.name} />
        <div style={laserdiscContainerStyle}>
          {reactLaserdiscs}
        </div>
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
