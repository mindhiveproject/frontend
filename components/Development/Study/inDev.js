import React, { Component } from 'react';

import styled from 'styled-components';

const StyledInDev = styled.div`
  background: #e5e5e5;
  display: grid;
  width: 100%;
  height: 80vh;
  justify-content: center;
  align-content: center;
  font-family: Roboto;
  font-size: 16px;
`;

class InDev extends Component {
  render() {
    return (
      <StyledInDev>
        <h1>
          This part of the platform is currently in development 🚧👷🏻‍♂️🚜👷⚙️
        </h1>
        <p>Please come back later to check it out.</p>
      </StyledInDev>
    );
  }
}

export default InDev;
