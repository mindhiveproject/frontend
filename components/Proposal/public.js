import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Link from 'next/link';
import styled from 'styled-components';
import Head from 'next/head';
import moment from 'moment';
import Error from '../ErrorMessage/index';
import Proposal from '../Dashboard/Jodit/proposal';

const StyledFullProposal = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
`;

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

          const { title, description, sections } = proposalPayloadData;
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
          const cardsContent = allCardsContent.flat().join('');
          let studyURL = '';
          if (proposalPayloadData?.study?.slug) {
            studyURL = `<h3>Study URL: https://mindhive.science/studies/${proposalPayloadData?.study?.slug}</h3>`;
          }
          const content = `<h1>${title}</h1><h2>${description}</h2>${studyURL}${cardsContent}`;

          // extracting the study title is problematic as there are several classes
          const studyTitle = proposalPayloadData?.study?.title;
          const date = moment().format('MM-D-YYYY');

          return (
            <>
              <Head>
                <title>
                  {studyTitle}-{date}
                </title>
              </Head>
              <StyledFullProposal>
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
              </StyledFullProposal>
            </>
          );
        }}
      </Query>
    );
  }
}

export default ProposalPublic;
