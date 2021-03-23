import React, { Component } from 'react';
import ProposalTemplate from './template';

class ProposalSection extends Component {
  render() {
    return (
      <>
        <ProposalTemplate {...this.props} />
      </>
    );
  }
}

export default ProposalSection;
