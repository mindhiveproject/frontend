import React, { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';

import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';

import Inner from './inner';

export const BOARD_QUERY = gql`
  query BOARD_QUERY($id: ID!) {
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
          position
          content
          section {
            id
          }
        }
      }
    }
  }
`;

const CREATE_SECTION_MUTATION = gql`
  mutation CREATE_SECTION_MUTATION(
    $boardId: ID!
    $title: String!
    $description: String
    $position: Float!
  ) {
    createProposalSection(
      boardId: $boardId
      title: $title
      description: $description
      position: $position
    ) {
      id
      title
      description
      position
    }
  }
`;

const UPDATE_SECTION = gql`
  mutation UPDATE_SECTION(
    $id: ID!
    $boardId: ID!
    $title: String
    $description: String
    $position: Float
    $cards: [ID]
  ) {
    updateProposalSection(
      id: $id
      boardId: $boardId
      title: $title
      description: $description
      position: $position
      cards: $cards
    ) {
      id
      title
      description
      position
      cards {
        id
        title
        position
        content
      }
    }
  }
`;

const DELETE_SECTION = gql`
  mutation DELETE_SECTION($id: ID!, $boardId: ID!) {
    deleteProposalSection(id: $id, boardId: $boardId) {
      id
    }
  }
`;

const Board = ({ id, openCard }) => {
  const { loading, error, data } = useQuery(BOARD_QUERY, {
    variables: { id },
  });

  const [sections, setSections] = useState([]);
  const [createSection, createSectionState] = useMutation(
    CREATE_SECTION_MUTATION
  );
  const [updateSection, updateSectionState] = useMutation(UPDATE_SECTION);
  const [deleteSection, deleteSectionState] = useMutation(DELETE_SECTION);

  useEffect(() => {
    if (data) {
      const newSections = data.proposalBoard.sections;
      const sortedSections = sortBy(newSections, [section => section.position]);
      const sortedCardsSections = sortedSections.map(section => {
        const sortedSection = {
          ...section,
          cards: sortBy(section.cards, item => item.position),
        };
        return sortedSection;
      });
      setSections(sortedCardsSections);
    }
  }, [data]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Inner
      board={data.proposalBoard}
      sections={sections}
      onCreateSection={createSection}
      onUpdateSection={updateSection}
      onSetSections={setSections}
      onDeleteSection={deleteSection}
      openCard={openCard}
    />
  );
};

export default Board;
