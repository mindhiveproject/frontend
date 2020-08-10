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
        </div>
      </StyledSettingsBlock>
    );
  }
}

export default SettingBlock;
