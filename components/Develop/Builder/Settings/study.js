import React, { Component } from 'react';
import StudyTagger from '../../../Tag/StudyTagger';
import StudyFlow from './studyFlow';
import StudyDescription from './studyDescription';

class StudySettings extends Component {
  render() {
    return (
      <>
        <div className="card">
          <StudyDescription {...this.props} />
        </div>
        <div className="card">
          <StudyTagger {...this.props} />
        </div>
        <div className="card">
          <StudyFlow {...this.props} />
        </div>
      </>
    );
  }
}

export default StudySettings;
