import React, { Component } from 'react';

import Runner from './runner';

// this component manages the state with the actual version of data
class Manager extends Component {
  // main state
  state = {
    data: this.props.data,
    columnsToFilter: [],
    pipeline: [], // array of pipeline operations
    activeOperationPosition: -1, // TODO: default active operation
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
          pipeline={this.state.pipeline}
          activeOperationPosition={this.state.activeOperationPosition}
        />
      </>
    );
  }
}

export default Manager;
