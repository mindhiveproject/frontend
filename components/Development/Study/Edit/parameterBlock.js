import React, { Component } from 'react';
import { StyledParameterBlock } from '../../../Study/styles';

class ParameterBlock extends Component {
  render() {
    const { header, text, file, name } = this.props.block;
    return (
      <>
        {name === 'thankYouMessage' && (
          <div key={name} htmlFor={name}>
            <label>Thank you message (shown at the end of each task)</label>
            <textarea
              name={name}
              value={text}
              onChange={this.props.handleParameterChange}
              className="text"
              rows="10"
            />
          </div>
        )}
      </>
    );
  }
}

export default ParameterBlock;
