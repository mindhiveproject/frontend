import React, { Component } from 'react';

import Runner from './runner';

// this component manages the state with the actual version of data
class Manager extends Component {
  // main state
  state = {
    data: this.props.data,
    columnsToFilter: [],
    activeOperationPosition: -1, // TODO: default active operation
    transformPipe: [], // transform pipe
    spec: {},
  };

  // general function to update the data in the state
  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  // here i am testing the functions with simple buttons
  render() {
    return (
      <>
        <div>Hello there, i am data manager and I manage the state</div>
        <Runner
          data={this.state.data}
          columnsToFilter={this.state.columnsToFilter}
          updateState={this.updateState}
          activeOperationPosition={this.state.activeOperationPosition}
          transformPipe={this.state.transformPipe}
          spec={this.state.spec}
        />
      </>
    );
  }
}

export default Manager;
