import React, { Component } from 'react';
import Builder from './Builder/index';

// old components
import ProposalSection from '../Development/Study/Proposal/index';
import ReviewSection from '../Development/Study/Review/index';
import CollectSection from '../Development/Study/Collect/index';
import DownloadSection from '../Development/Study/Download/index';
import AnalyzeSection from '../Development/Study/Analyze/index';

export default class Page extends Component {
  render() {
    const { page } = this.props;
    return (
      <>
        {page === 'builder' && <Builder {...this.props} />}
        {page === 'proposal' && <ProposalSection {...this.props} />}
        {page === 'review' && <ReviewSection {...this.props} />}
        {page === 'collect' && <CollectSection {...this.props} />}
        {page === 'download' && <DownloadSection {...this.props} />}
        {page === 'analyze' && <AnalyzeSection {...this.props} />}
      </>
    );
  }
}
