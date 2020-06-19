import React, { Component } from 'react';
import { StyledBox } from './styles';

class Qualtrics extends Component {
  render() {
    const { link, user } = this.props;
    const customLink = `${link}?name=${user.username}`;
    return (
      <StyledBox>
        <h2>Embedded Qualtrics Survey</h2>
        <iframe
          src={customLink}
          height="100%"
          width="100%"
          frameBorder="0"
        ></iframe>
      </StyledBox>
    );
  }
}

export default Qualtrics;
