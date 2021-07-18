import React, { Component } from 'react';

import styled from 'styled-components';

const StyledInDev = styled.div`
  background: #e5e5e5;
  display: grid;
  width: 100%;
  justify-content: center;
  align-content: center;
  font-family: Roboto;
  font-size: 16px;
`;

class InDev extends Component {
  render() {
    const header =
      this.props.header ||
      `This part of the platform is currently in development 🚧👷🏻‍♂️🚜👷⚙️`;
    const message =
      this.props.message || `Please come back later to check it out.`;
    return (
      <StyledInDev>
        <h1>{header}</h1>
        <p>{message}</p>
      </StyledInDev>
    );
  }
}

export default InDev;
