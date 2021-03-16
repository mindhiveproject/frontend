import React, { Component } from 'react';
import Data from '../../../DataViz/index';

class AnalyzeSection extends Component {
  render() {
    return <Data id={this.props.studyId} />;
  }
}

export default AnalyzeSection;
