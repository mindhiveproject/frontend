import React, { Component } from 'react';
import moment from 'moment';
import Head from 'next/head';
import styled from 'styled-components';
import Proposal from '../Dashboard/Jodit/proposal';

const StyledFullProposal = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  padding: 2rem;
  max-width: 1200px;
`;

class ProposalPDF extends Component {
  render() {
    const { title, description, sections, study } = this.props.proposal;
    // order sections by position
    const orderedSections = [...sections].sort(
      (a, b) => a.position - b.position
    );
    const allCardsContent = orderedSections.map(section => {
      // order cards inside each section
      const orderedCards = [...section.cards].sort(
        (a, b) => a.position - b.position
      );
      // get the content of completed cards together with titles
      const completedCardsWithTitles = orderedCards
        .filter(card => card?.settings?.status === 'Completed')
        .map(card => `<h3>${card?.title}</h3>${card?.content}`);
      // append the section title
      const cardsWithSectionTitles = `<h2>${
        section?.title
      }</h2>${completedCardsWithTitles.join('')}`;
      return cardsWithSectionTitles;
    });
    // put all cards content together
    const cardsContent = allCardsContent.flat().join('');
    let studyURL = '';
    if (study?.slug) {
      studyURL = `<h3>Study URL: https://mindhive.science/studies/${study?.slug}</h3>`;
    }
    // put all proposal content together
    const content = `<h1>${title}</h1><h2>${description}</h2>${studyURL}${cardsContent}`;

    // extracting the study title is problematic as there are several classes
    const studyTitle = study?.title;
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
            loading={this.props.loading}
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
  }
}

export default ProposalPDF;
