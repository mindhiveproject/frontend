import React, { Component } from 'react';
import Manager from './manager';

class Router extends Component {
  state = {
    datasetTypeDefault: 'aggregated',
    specDefault: {
      width: '500',
      height: '400',
      mark: 'bar',
      transform: [],
      encoding: {
        x: { field: 'task', type: 'nominal' },
        y: { field: 'meanReactionTime', type: 'quantitative', aggregate: '' },
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

  aggregate = data => {
    const aggregated = data
      .filter(row => row.aggregated)
      .map(f => ({
        study: f.study,
        task: f.task,
        participantId: f.participantId,
        ...f.aggregated,
      }));
    console.log('aggregated.length', aggregated.length);
    return aggregated;
  };

  render() {
    const dataAggregated = this.aggregate(this.props.data);

    return (
      <Manager
        dataRaw={this.props.data}
        dataAggregated={dataAggregated}
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
