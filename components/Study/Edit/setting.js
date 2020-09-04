import React, { Component } from 'react';
import { StyledSettingsBlock } from '../styles';

class SettingBlock extends Component {
  render() {
    const { name } = this.props;
    return (
      <StyledSettingsBlock key={name} htmlFor={name}>
        <div className="input" style={{ width: '50px' }}>
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={this.props.value}
            onChange={this.props.onChange}
          />
        </div>
        <div style={{ display: 'grid' }}>
          {name === 'guestParticipation' && (
            <label className="name" htmlFor={name}>
              Allow guest participation
            </label>
          )}
          {name === 'zipCode' && (
            <label className="name" htmlFor={name}>
              Ask zip code
            </label>
          )}
          {name === 'consentObtained' && (
            <label className="name" htmlFor={name}>
              The study was reviewed by IRB (Institutional review board)
            </label>
          )}
          {name === 'proceedToFirstTask' && (
            <label className="name" htmlFor={name}>
              Participants automatically proceed to the first task after signing
              in
            </label>
          )}
        </div>
      </StyledSettingsBlock>
    );
  }
}

export default SettingBlock;
