import React, { Component } from 'react';
import { StyledParameterBlock } from '../styles';

class SettingBlock extends Component {
  render() {
    const { name, taskType } = this.props;
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
