import React, { Component } from 'react';
import styled from 'styled-components';

const StyledSettingsBlock = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24px 1fr;
  grid-gap: 16px;
  justify-items: start;
  border-radius: 5px;
`;

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
            onChange={this.props.handleSettingsChange}
          />
        </div>
        <div style={{ display: 'grid' }}>
          {name === 'guestParticipation' && (
            <label className="name" htmlFor={name}>
              Allow guest participation
            </label>
          )}
          {name === 'consentObtained' && (
            <label className="name" htmlFor={name}>
              Show IRB consent forms
            </label>
          )}
          {name === 'zipCode' && (
            <label className="name" htmlFor={name}>
              Ask participants for zip code
            </label>
          )}
          {name === 'proceedToFirstTask' && (
            <label className="name" htmlFor={name}>
              After joining the study, automatically take participants to first
              task
            </label>
          )}
          {name === 'minorsBlocked' && (
            <label className="name" htmlFor={name}>
              Only allow participants over 18 to take part in this study
            </label>
          )}
        </div>
      </StyledSettingsBlock>
    );
  }
}

export default SettingBlock;
