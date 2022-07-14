import React, { Component } from 'react';
// new components
import Proposal from './Proposal/index';
import Builder from './Builder/index';
import ParticipantPage from './ParticipantPage/index';
import Review from './Review/index';

// old components
// import ProposalSection from '../Development/Study/Proposal/index';
// import ReviewSection from '../Development/Study/Review/index';
import CollectSection from '../Development/Study/Collect/index';
import DownloadSection from '../Development/Study/Download/index';
import AnalyzeSection from '../Development/Study/Analyze/index';

export default class Page extends Component {
  render() {
    const { page } = this.props;
    return (
      <>
        {page === 'proposal' && <Proposal {...this.props} />}
        {page === 'builder' && <Builder {...this.props} />}
        {page === 'participant' && <ParticipantPage {...this.props} />}
        {page === 'review' && <Review {...this.props} />}
        {page === 'collect' && <CollectSection {...this.props} />}
        {page === 'analyze' && <AnalyzeSection {...this.props} />}
      </>
    );
  }
}
