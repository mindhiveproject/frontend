import React, { Component } from 'react';

import { StyledBoard } from '../styles';

import Preview from './Preview/index';
import Settings from './Settings/index';

export default class ParticipantPage extends Component {
  render() {
    return (
      <StyledBoard>
        <Preview {...this.props} />
        <Settings {...this.props} />
      </StyledBoard>
    );
  }
}
