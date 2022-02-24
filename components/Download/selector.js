import React, { Component } from 'react';
import dynamic from 'next/dynamic';

import Result from './result';

import { StyledDownload } from './styles';

const DynamicRawDataLoader = dynamic(() => import('./Loader/raw'), {
  ssr: false,
});
const DynamicAggregatedByTestDataLoader = dynamic(
  () => import('./Loader/aggByTest'),
  { ssr: false }
);
const DynamicAggregatedByParticipantDataLoader = dynamic(
  () => import('./Loader/aggByParticipant'),
  { ssr: false }
);

class Selector extends Component {
  state = {
    results: this.props?.myStudyResults.filter(result => result?.fullData?.id),
  };

  toggleResult = ({ isSelected, id }) => {
    let results;
    if (isSelected) {
      results = [...this.state.results].filter(r => r?.id !== id);
    } else {
      results = [
        ...this.state.results,
        ...this.props?.myStudyResults.filter(r => r?.id === id),
      ];
    }
    this.setState({ results });
  };

  render() {
    const { myStudyResults } = this.props;

    return (
      <StyledDownload>
        <div className="loadButtons">
          <DynamicRawDataLoader results={this.state.results} />
          <DynamicAggregatedByTestDataLoader results={this.state.results} />
        </div>
        <div className="taskSelector"></div>
        <div className="selector">
          {myStudyResults.map(result => {
            const isSelected = this.state.results
              .map(r => r.id)
              .includes(result?.id);
            return (
              <Result
                key={result?.id}
                result={result}
                isSelected={isSelected}
                toggleResult={this.toggleResult}
              />
            );
          })}
        </div>
      </StyledDownload>
    );
  }
}

export default Selector;
