import React, { Component } from 'react';
import Manager from './manager';

class Router extends Component {
  state = {
    datasetTypeDefault: 'aggregated',
    specDefault: {
      width: '500',
      height: '400',
      mark: 'point',
      transform: [],
      encoding: {
        x: { field: 'task', type: 'nominal' },
        y: { field: 'participantId', type: 'nominal', aggregate: '' },
      },
      data: { name: 'values' },
    },
    columnsToFilterDefault: [
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
    activeTransformationPositionDefault: -1,
  };

  render() {
    // const dataAggregated = this.aggregate(this.props.data);
    // const dataParticipant = this.perParticipant(dataAggregated);

    return (
      <Manager
        dataRaw={this.props.data}
        dataAggregated={this.props.dataAggregated}
        dataParticipant={this.props.dataParticipant}
        datasetTypeDefault={this.state.datasetTypeDefault}
        specDefault={this.state.specDefault}
        columnsToFilterDefault={this.state.columnsToFilterDefault}
        activeTransformationPositionDefault={
          this.state.activeTransformationPositionDefault
        }
      />
    );
  }
}

export default Router;
