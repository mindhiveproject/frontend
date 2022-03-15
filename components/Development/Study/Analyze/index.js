import React, { Component } from 'react';
// import Data from '../../../DataViz/index';
import InDev from '../inDev';

import Starboard from '../../../Starboard/index';

class AnalyzeSection extends Component {
  render() {
    const { study } = this.props;
    if (!study || !study.id) {
      return (
        <InDev
          header="No study found"
          message="Please save your study first."
        />
      );
    }

    // return <Data id={this.props.studyId} />;
    return <Starboard study={study} />;
  }
}

export default AnalyzeSection;
