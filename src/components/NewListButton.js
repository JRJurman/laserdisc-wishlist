import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class NewListButton extends Component {
  // should a component be connected to a redux store?
  // if not, how do we make an ajax request cleanly?
  // do we keep it in local state?

  // how do we switch what location we are at?
  // => router has navigate to methods
  render() {
    return (
      <div>
        <Button bsStyle="success">Create New List</Button>
      </div>
    );
  }
}

export default NewListButton;
