import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { SimpleInformationBlock } from '../Styles/Forms';

class InformationBlock extends Component {
  render() {
    const { text, name } = this.props.block;
    return (
      <SimpleInformationBlock key={name} htmlFor={name}>
        {name === 'regularAdults' && (
          <h3>The consent form for regular adult participants</h3>
        )}
        {name === 'regularMinors' && (
          <h3>The consent form for parents of participants under 18</h3>
        )}
        {name === 'regularMinorsKids' && (
          <h3>The consent form for regular participants under 18</h3>
        )}
        {name === 'sonaAdults' && (
          <h3>The consent form for SONA adult participants</h3>
        )}
        {name === 'sonaMinors' && (
          <h3>The consent form for parents of SONA participants under 18</h3>
        )}
        {name === 'sonaMinorsKids' && (
          <h3>The consent form for SONA participants under 18</h3>
        )}
        {name === 'studentsNYC' && (
          <h3>The consent form for students in a public school in NYC</h3>
        )}
        {name === 'studentsMinorsNYC' && (
          <h3>
            The consent form for students under 18 in a public school in NYC
          </h3>
        )}
        {name === 'studentsParentsNYC' && (
          <h3>
            The consent form for parents of students under 18 in a public school
            in NYC
          </h3>
        )}

        <div>{ReactHtmlParser(text)}</div>
      </SimpleInformationBlock>
    );
  }
}

export default InformationBlock;
