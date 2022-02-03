import React, { Component } from 'react';
import styled from 'styled-components';
import { StyledParameterBlock } from '../styles';

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
    const { name, taskType } = this.props;
    if (name === 'mobileCompatible') {
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
            <label className="name" htmlFor={name}>
              {taskType} is mobile compatible
            </label>
          </div>
        </StyledSettingsBlock>
      );
    }
    if (name === 'duration') {
      return (
        <StyledParameterBlock key={name} htmlFor={name}>
          <div className="input">
            <label>{taskType} duration</label>
            <input
              type="text"
              id={name}
              name={name}
              value={this.props.value}
              onChange={this.props.onChange}
            />
          </div>
        </StyledParameterBlock>
      );
    }
    return (
      <StyledParameterBlock key={name} htmlFor={name}>
        {name === 'descriptionBefore' && (
          <p>{taskType} card description (pre-participation)</p>
        )}
        {name === 'descriptionAfter' && (
          <p>{taskType} card description (post-participation)</p>
        )}
        <div className="input">
          <textarea
            id={name}
            name={name}
            value={this.props.value}
            onChange={this.props.onChange}
            rows="5"
          />
        </div>
        {name === 'descriptionBefore' && (
          <span>
            This is visible to anyone who hasn't yet participated in the task.
          </span>
        )}
        {name === 'descriptionAfter' && (
          <span>
            This is visible to anyone who has participated in the task.
          </span>
        )}
      </StyledParameterBlock>
    );
  }
}
export default SettingBlock;
