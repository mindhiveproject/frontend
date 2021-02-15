import React, { Component } from 'react';

import Runner from './runner';

// this component manages the state with the actual version of data
class Manager extends Component {
  // main state
  state = {
    data: this.props.data,
    transformedData: this.props.data,
    columnsToFilter: [
      'url',
      'meta',
      'sender_id',
      'ended_on',
      'time_run',
      'time_render',
      'time_show',
      'time_end',
      'time_commit',
      'time_switch',
    ],
    spec: {
      width: '500',
      height: '400',
      mark: 'bar',
      transform: [],
      encoding: {
        x: { field: '', type: 'nominal' },
        y: { field: '', type: 'quantitative', aggregate: '' },
        color: { field: '', type: '' },
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
