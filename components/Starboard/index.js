import React, { Component } from 'react';
import styled from 'styled-components';

const StyledStarboard = styled.div`
  .inDevHeader {
    display: grid;
    width: 100%;
    text-align: center;
  }
`;

class Starboard extends Component {
  render() {
    return (
      <StyledStarboard>
        <div className="inDevHeader">
          <h3>⚠️ In development</h3>
        </div>
        <iframe
          src="https://starboard.mindhive.science/"
          height="100%"
          width="100%"
          frameBorder="0"
        ></iframe>
      </StyledStarboard>
    );
  }
}

export default Starboard;
