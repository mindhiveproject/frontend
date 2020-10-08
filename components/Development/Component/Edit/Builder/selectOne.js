import React, { Component } from 'react';
import { StyledStatementLine, StyledOptionLine } from '../../styles';

class SelectOneOption extends Component {
  packTheObject = value => ({
    target: {
      name: this.props.name,
      type: 'select',
      value,
    },
  });

  handleChange = value => {
    this.props.onChange(this.packTheObject(value));
  };

  render() {
    const options = this.props.options.split('\n');
    return (
      <div>
        {options.map((option, number) => (
          <Option
            option={option}
            number={number}
            key={number}
            handleOptionChange={this.handleChange}
            selectedValue={this.props.value}
          />
        ))}
      </div>
    );
  }
}

class Option extends Component {
  render() {
    return (
      <StyledOptionLine
        className={this.props.option === this.props.selectedValue && 'selected'}
        id={this.props.number}
        name={this.props.number}
        onClick={() => this.props.handleOptionChange(this.props.option)}
      >
        {this.props.option}
      </StyledOptionLine>
    );
  }
}

export default SelectOneOption;
