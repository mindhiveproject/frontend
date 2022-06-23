import React, { Component } from 'react';
import SelectorWrapper from '../Selector/Wrapper';
import StudyTagger from '../../../Tag/StudyTagger';
import { StyledSettings } from '../../styles';

export default class Settings extends Component {
  render() {
    return (
      <StyledSettings>
        <h2>Study settings</h2>
        <div className="card">
          <SelectorWrapper />
        </div>
        <div className="card">
          <StudyTagger {...this.props} />
        </div>
      </StyledSettings>
    );
  }
}
