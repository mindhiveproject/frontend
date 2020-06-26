import React, { Component } from 'react';
import { StyledParameterBlock } from '../styles';

class SettingBlock extends Component {
  render() {
    const { name } = this.props;
    return (
      <StyledParameterBlock key={name} htmlFor={name}>
        <div className="name">{name}</div>
        <div className="input">
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={this.props.value}
            onChange={this.props.onChange}
          />
        </div>
      </StyledParameterBlock>
    );
  }
}

export default SettingBlock;
