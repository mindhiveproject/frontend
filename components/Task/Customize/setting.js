import React, { Component } from 'react';
import { StyledParameterBlock } from '../styles';

class SettingBlock extends Component {
  render() {
    const { name } = this.props;
    if (name === 'duration') {
      return (
        <StyledParameterBlock key={name} htmlFor={name}>
          <h2>Task duration</h2>
          <div className="input">
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
          <h2>Information that participants see before participation</h2>
        )}
        {name === 'descriptionAfter' && (
          <h2>Information that participants see after participation</h2>
        )}
        <div className="input">
          <textarea
            id={name}
            name={name}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        </div>
      </StyledParameterBlock>
    );
  }
}

export default SettingBlock;
