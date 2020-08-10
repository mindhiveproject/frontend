import React, { Component } from 'react';
import { StyledParameterBlock } from '../styles';

class InformationBlock extends Component {
  render() {
    const { header, text, file, name } = this.props.block;
    return (
      <StyledParameterBlock key={name} htmlFor={name}>
        <div className="name">{name}</div>
        {name === 'what' && <div>What is the study about?</div>}
        {name === 'who' && <div>Who are the authors of the study?</div>}
        {name === 'how' && (
          <div>What do you expect the participants of your study to do?</div>
        )}
        {name === 'time' && <div>How long is your study?</div>}
        {name === 'frequency' && (
          <div>What is the frequency of your study?</div>
        )}
        {name === 'partners' && <div>Partners</div>}
        {name === 'tags' && <div>Tags</div>}
        {name === 'contacts' && <div>Contacts</div>}
        {name === 'consentForm' && <div>Consent form</div>}
        {name === 'consentFormForParents' && (
          <div>Consent form for parents</div>
        )}
        {name.startsWith('faq') && (
          <div>
            Information for FAQ
            <p>
              <em>
                You can add more questions by entering "faq_2", "faq_3", etc. in
                the field at the bottom of the page and click{' '}
                <code>Add new information block</code>
              </em>
            </p>
          </div>
        )}

        {name.startsWith('faq') && (
          <div>
            <div>Question</div>
            <input
              type="text"
              name={name}
              value={header}
              onChange={this.props.onChange}
              className="header"
            />
          </div>
        )}

        {name.startsWith('faq') && <div>Answer</div>}

        <textarea
          name={name}
          value={text}
          onChange={this.props.onChange}
          className="text"
        />

        {false && (
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
        )}

        {true && (
          <button
            style={{ width: '100px', display: 'grid', justifySelf: 'end' }}
            onClick={e => this.props.onDelete(e, name)}
          >
            Delete
          </button>
        )}
      </StyledParameterBlock>
    );
  }
}

export default InformationBlock;
