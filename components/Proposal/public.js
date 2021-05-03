import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Link from 'next/link';
import Error from '../ErrorMessage/index';
import Proposal from '../Dashboard/Jodit/proposal';

const PROPOSAL_QUERY = gql`
  query PROPOSAL_QUERY($slug: String!) {
    proposalBoard(where: { slug: $slug }) {
      id
      title
      slug
      description
      study {
        id
        title
        slug
      }
      sections {
        id
        title
        description
        position
        cards {
          id
          title
          content
          settings
          position
          section {
            id
          }
        }
      }
    }
  }
`;

class ProposalPublic extends Component {
  render() {
    return (
      <Query query={PROPOSAL_QUERY} variables={{ slug: this.props.slug }}>
        {proposalPayload => {
          const proposalPayloadError = proposalPayload.error;
          const proposalPayloadLoading = proposalPayload.loading;
          const proposalPayloadData =
            proposalPayload.data && proposalPayload.data.proposalBoard;
          if (proposalPayloadError)
            return <Error error={proposalPayloadError} />;
          if (proposalPayloadLoading) return <p>Loading</p>;
          if (!proposalPayloadData)
            return (
              <div>
                <h1>No proposal found</h1>
                <Link
                  href={{
                    pathname: '/',
                  }}
                >
                  <a>
                    <p>Check the list of public studies</p>
                  </a>
                </Link>
              </div>
            );

          const { title, sections } = proposalPayloadData;
          const orderedSections = [...sections].sort(
            (a, b) => a.position - b.position
          );
          const allCardsContent = orderedSections.map(section => {
            const orderedCards = [...section.cards].sort(
              (a, b) => a.position - b.position
            );
            return orderedCards
              .filter(card => card?.settings?.status === 'Completed')
              .map(card =>
                [`<h2>${section.title} - `, `${card.title}</h2>`, card.content]
                  .flat()
                  .join('')
              );
          });
          const content = allCardsContent.flat().join('');

          return (
            <>
              <Proposal
                onSubmit={async e => {
                  e.preventDefault();
                }}
                loading={proposalPayloadLoading}
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
                proposal
              />
            </>
          );
        }}
      </Query>
    );
  }
}

export default ProposalPublic;