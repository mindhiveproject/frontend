import React, { Component } from 'react';

import { StyledSettings } from '../styles';

import Parameters from './parameters';
import ShareStudy from './share';

class Settings extends Component {
  render() {
    return (
      <StyledSettings>
        <ShareStudy {...this.props} />
        <Parameters {...this.props} />
      </StyledSettings>
    );
  }
}

export default Settings;
