import React, { Component } from 'react';
import Data from '../../../DataViz/index';
import InDev from '../inDev';

class AnalyzeSection extends Component {
  render() {
    const { studyId } = this.props;
    if (!studyId) {
      return (
        <InDev
          header="No study found"
          message="Please save your study first."
        />
      );
    }

    return <Data id={this.props.studyId} />;
  }
}

export default AnalyzeSection;
