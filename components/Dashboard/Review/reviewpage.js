import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

import Head from 'next/head';
import moment from 'moment';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import Error from '../../ErrorMessage/index';

import Post from '../Jodit/post';

const StyledFullReviewContainer = styled.div`
  margin: 50px;
`;

const FULL_PROPOSAL_QUERY = gql`
  query FULL_PROPOSAL_QUERY($id: ID!) {
    proposalBoard(where: { id: $id }) {
      id
      title
      slug
      description
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          content
          position
          section {
            id
          }
        }
      }
    }
  }
`;

class ReviewPage extends Component {
  state = {};

  render() {
    const proposalId = this.props.proposal.id;

    return (
      <>
        <StyledFullReviewContainer>
          <Query query={FULL_PROPOSAL_QUERY} variables={{ id: proposalId }}>
            {({ error, loading, data }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading</p>;
              if (!data?.proposalBoard)
                return <p>No proposal found for {proposalId}</p>;
              const proposal = data.proposalBoard;
              const { title, description, sections } = proposal;

              // calculate all content
              const orderedSections = [...sections].sort(
                (a, b) => a.position - b.position
              );
              const allCardsContent = orderedSections.map(section => {
                const orderedCards = [...section.cards].sort(
                  (a, b) => a.position - b.position
                );
                return orderedCards.map(card => card.content);
              });

              const content = allCardsContent.flat().join('');

              return (
                <div>
                  <Post
                    onSubmit={async e => {
                      e.preventDefault();
                      console.log('submit event');
                    }}
                    loading={loading}
                    title={title}
                    onTitleChange={() => {
                      console.log('title change');
                    }}
                    content={content}
                    onContentChange={() => {
                      console.log('content change');
                    }}
                    btnName="Save"
                    readonly
                  />
                </div>
              );
            }}
          </Query>
        </StyledFullReviewContainer>
      </>
    );
  }
}

export default ReviewPage;
