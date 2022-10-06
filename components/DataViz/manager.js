import React, { Component } from 'react';

import Runner from './runner';

// this component manages the state with the actual version of data
class Manager extends Component {
  // main state
  state = {
    data:
      this.props.datasetTypeDefault === 'raw'
        ? this.props.dataRaw
        : this.props.dataParticipant,
    transformedData:
      this.props.datasetTypeDefault === 'raw'
        ? this.props.dataRaw
        : this.props.dataParticipant,
    columnsToFilter: this.props.columnsToFilterDefault,
    spec: this.props.specDefault,
    activeTransformationPosition: this.props
      .activeTransformationPositionDefault, // TODO: default active operation
    datasetType: this.props.datasetTypeDefault,
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

  onDatasetTypeChange = datasetType => {
    this.setState({
      datasetType,
      data:
        datasetType === 'raw' ? this.props.dataRaw : this.props.dataParticipant,
      transformedData:
        datasetType === 'raw' ? this.props.dataRaw : this.props.dataParticipant,
      columnsToFilter: this.props.columnsToFilterDefault,
      spec: this.props.specDefault,
      activeTransformationPosition: this.props
        .activeTransformationPositionDefault,
    });
  };

  render() {
    return (
      <Runner
        dataRaw={this.props.dataRaw}
        data={this.state.data}
        transformedData={this.state.transformedData}
        columnsToFilter={this.state.columnsToFilter}
        updateState={this.updateState}
        updateSpec={this.updateSpec}
        activeTransformationPosition={this.state.activeTransformationPosition}
        spec={this.state.spec}
        onDatasetTypeChange={this.onDatasetTypeChange}
        datasetType={this.state.datasetType}
      />
    );
  }
}

export default Manager;
