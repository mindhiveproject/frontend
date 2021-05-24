import React, { Component } from 'react';
import StudyParticipants from './Participants/index';

class CollectSection extends Component {
  render() {
    const { study } = this.props;
    return (
      <div>
        <StudyParticipants id={study?.id} studySlug={study?.slug} />
      </div>
    );
  }
}

export default CollectSection;
