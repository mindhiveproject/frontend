import React, { Component } from 'react';
import { StyledBox } from './styles';

class Qualtrics extends Component {
  render() {
    return (
      <StyledBox>
        <h2>Embedded Qualtrics Survey</h2>
        <iframe
          src="https://psychkonstanz.eu.qualtrics.com/jfe/form/SV_6GBeq8pZsz3ulWB?name=Peter"
          height="100%"
          width="100%"
          frameBorder="0"
        ></iframe>
      </StyledBox>
    );
  }
}

export default Qualtrics;
