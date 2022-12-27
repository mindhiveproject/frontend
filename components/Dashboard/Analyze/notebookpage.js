import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import styled from 'styled-components';
import Head from 'next/head';

import { Tab } from 'semantic-ui-react';
import Error from '../../ErrorMessage/index';
import { StyledDasboard, StyledDevelopDasboard } from '../styles';

// import { JOURNAL_POSTS } from '../../Queries/Journal';

const StyledPosts = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 10px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  cursor: pointer;
`;

class NotebookPage extends Component {
  render() {
    return (
      <StyledDasboard>
        <StyledDevelopDasboard>
          <Head>
            <title>mindHIVE | {journal.title}</title>
          </Head>
          <>
            <div className="goBackBtn">
              <span style={{ cursor: 'pointer' }} onClick={this.props.goBack}>
                ← Back
              </span>
            </div>
          </>

          <div className="navigationHeader">Notebook page</div>
        </StyledDevelopDasboard>
      </StyledDasboard>
    );
  }
}

export default NotebookPage;
