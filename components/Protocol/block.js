import React, { Component } from 'react';
import { SimpleInformationBlock } from '../Styles/Forms';

class InformationBlock extends Component {
  render() {
    const { header, text, file, name } = this.props.block;
    return (
      <SimpleInformationBlock key={name} htmlFor={name}>
        <div className="name">{name}</div>
        {name === 'regularAdults' && (
          <div>The consent form for regular adult participants</div>
        )}
        {name === 'regularMinors' && (
          <div>The consent form for parents of participants under 18</div>
        )}
        {name === 'regularMinorsKids' && (
          <div>The consent form for regular participants under 18</div>
        )}
        {name === 'sonaAdults' && (
          <div>The consent form for SONA adult participants</div>
        )}
        {name === 'sonaMinors' && (
          <div>The consent form for parents of SONA participants under 18</div>
        )}
        {name === 'sonaMinorsKids' && (
          <div>The consent form for SONA participants under 18</div>
        )}

        <textarea
          name={name}
          value={text}
          onChange={this.props.onChange}
          className="text"
        />

        <button
          style={{ width: '100px', display: 'grid', justifySelf: 'start' }}
          onClick={e => this.props.onDelete(e, name)}
        >
          Delete
        </button>
      </SimpleInformationBlock>
    );
  }
}

export default InformationBlock;
