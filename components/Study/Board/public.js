import React, { Component } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import StudiesBank from '../../Bank/Studies/index';

const StyledStudiesBoard = styled.div`
  /* width: 100vh; */
  display: grid;
  padding: 20px;

  .studies {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-column-gap: 26px;
    grid-row-gap: 26px;
    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }

  h1 {
    font-family: Lato;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 56px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
  }

  h2 {
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
  }

  a {
    cursor: pointer;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: #007c70;
  }
`;

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-react-apollo-2-1-199e9e2bd01e
class AllStudies extends Component {
  goToStudy = study => {
    Router.push('/studies/[slug]', `/studies/${study.slug}`);
  };

  render() {
    return (
      <StyledStudiesBoard>
        <StudiesBank onSelectStudy={this.goToStudy} />
      </StyledStudiesBoard>
    );
  }
}

export default AllStudies;
