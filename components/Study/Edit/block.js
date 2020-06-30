import React, { Component } from 'react';
import { StyledParameterBlock } from '../styles';

class InformationBlock extends Component {
  render() {
    const { header, text, file, name } = this.props.block;
    return (
      <StyledParameterBlock key={name} htmlFor={name}>
        <div className="name">{name}</div>

        <div>Header</div>
        <input
          type="text"
          name={name}
          value={header}
          onChange={this.props.onChange}
          className="header"
        />

        <div>Text</div>
        <textarea
          name={name}
          value={text}
          onChange={this.props.onChange}
          className="text"
        />

        <label htmlFor="file">
          Image
          <input
            type="file"
            name={name}
            placeholder="Upload an image"
            onChange={this.props.onFileChange}
            className="file"
          />
        </label>
        {true && (
          <button onClick={e => this.props.onDelete(e, name)}>Delete</button>
        )}
      </StyledParameterBlock>
    );
  }
}

export default InformationBlock;
