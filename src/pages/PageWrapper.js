import React, { Component } from 'react';
import Header from '../components/Header';

const appStyle = {
  textAlign: 'center'
}

class PageWrapper extends Component {
  render() {
    return (
      <div style={appStyle}>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

export default PageWrapper;
