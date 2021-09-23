import React, { Component } from 'react';

import styled from 'styled-components';

import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

const StyledClassHeader = styled.div`
  display: grid;
  margin-bottom: 20px;
  padding: 10px;
  input,
  textarea,
  select {
    background: #f6f9f8;
    width: 100%;
    border: 0px solid #e6e6e6;
    border-radius: 4px;
    &:focus {
      outline: 0;
      background: white;
      border-color: mintcream;
    }
  }
  button {
    background: #007c70;
    color: white;
    max-width: 256px;
    border-radius: 3px;
    cursor: pointer;
  }
  .title {
    font-family: Lato;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 56px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
    margin-bottom: 23px;
  }
  .description {
    font-family: Lato;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
  }
`;

class ClassHeader extends Component {
  render() {
    return (
      <StyledClassHeader>
        <div>
          <div className="title">{this.props.schoolclass.title}</div>
          <div className="description">
            {this.props.schoolclass.description}
          </div>
        </div>
      </StyledClassHeader>
    );
  }
}

export default ClassHeader;
