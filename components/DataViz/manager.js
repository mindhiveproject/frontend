import React, { Component } from 'react';

import Runner from './runner';

// this component manages the state with the actual version of data
class Manager extends Component {
  // main state
  state = {
    data: this.props.data,
    transformedData: this.props.data,
    columnsToFilter: [],
    spec: {
      width: 'container',
      height: 'container',
      mark: 'bar',
      transform: [],
      encoding: {
        x: { field: 'color', type: 'ordinal' },
        y: { field: 'duration', type: 'quantitative' },
      },
      data: { name: 'values' },
    },
    activeTransformationPosition: -1, // TODO: default active operation
  };

  // general function to update the data in the state
  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  // update specification
  updateSpec = (name, value) => {
    const { spec } = this.state;
    const newSpec = { ...spec };
    newSpec[name] = value;
    this.setState({
      spec: newSpec,
    });
  };

  // here i am testing the functions with simple buttons
  render() {
    return (
      <Runner
        data={this.state.data}
        columnsToFilter={this.state.columnsToFilter}
        updateState={this.updateState}
        updateSpec={this.updateSpec}
        activeTransformationPosition={this.state.activeTransformationPosition}
        spec={this.state.spec}
        transformedData={this.state.transformedData}
      />
    );
  }
}

export default Manager;
