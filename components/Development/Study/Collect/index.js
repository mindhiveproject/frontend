import React, { Component } from 'react';
import StudyParticipants from './Participants/index';
import InDev from '../inDev';

class CollectSection extends Component {
  render() {
    const { study } = this.props;

    if (!study?.id) {
      return (
        <InDev
          header="👀 No study found"
          message="Please save your new study"
        />
      );
    }

    return (
      <div>
        <StudyParticipants id={study?.id} studySlug={study?.slug} />
      </div>
    );
  }
}

export default CollectSection;
