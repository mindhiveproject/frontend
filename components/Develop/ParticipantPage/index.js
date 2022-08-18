import React, { Component } from 'react';

import { StyledParticipantPage } from './styles';

import Preview from './Preview/index';
import Settings from './Settings/index';

export default class ParticipantPage extends Component {
  render() {
    return (
      <StyledParticipantPage>
        <Preview {...this.props} />
        <Settings {...this.props} />
      </StyledParticipantPage>
    );
  }
}
