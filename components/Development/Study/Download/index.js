import React, { Component } from 'react';
import Download from '../../../Download/index';
import InDev from '../inDev';

class AnalyzeSection extends Component {
  render() {
    const { studyId } = this.props;
    if (!studyId) {
      return (
        <InDev
          header="👀 No study found"
          message="Please save your new study"
        />
      );
    }

    return <Download id={this.props.studyId} />;
  }
}

export default AnalyzeSection;
