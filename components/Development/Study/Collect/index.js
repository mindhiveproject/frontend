import React, { Component } from 'react';
import InDev from '../inDev';

import CollectWrapper from './wrapper';

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

    return <CollectWrapper study={study} />;
  }
}

export default CollectSection;
