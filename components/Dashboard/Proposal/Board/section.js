import React, { useState } from 'react';
import ReactHTMLParser from 'react-html-parser';
import { gql, useMutation } from '@apollo/client';
import sortBy from 'lodash/sortBy';
import { Container, Draggable } from 'react-smooth-dnd';
import { v1 as uuidv1 } from 'uuid';
import { StyledSection, StyledNewInput } from './styles';

import Card from './card';
import { BOARD_QUERY } from './board';

const CREATE_CARD_MUTATION = gql`
  mutation CREATE_CARD_MUTATION(
    $boardId: ID!
    $title: String!
    $content: String
    $sectionId: ID!
    $position: Float!
  ) {
    createProposalCard(
      boardId: $boardId
      title: $title
      content: $content
      sectionId: $sectionId
      position: $position
    ) {
      id
      title
      content
      position
      section {
        id
      }
    }
  }
`;

const UPDATE_CARD_MUTATION = gql`
  mutation UPDATE_CARD_MUTATION(
    $id: ID!
    $boardId: ID!
    $title: String
    $content: String
    $sectionId: ID
    $position: Float
  ) {
    updateProposalCard(
      id: $id
      boardId: $boardId
      title: $title
      content: $content
      sectionId: $sectionId
      position: $position
    ) {
      id
      title
      content
      position
      section {
        id
      }
    }
  }
`;

const DELETE_CARD = gql`
  mutation DELETE_CARD($id: ID!, $boardId: ID!) {
    deleteProposalCard(id: $id, boardId: $boardId) {
      id
      section {
        id
      }
    }
  }
`;

const Section = ({
  section,
  sections,
  boardId,
  onUpdateSection,
  deleteSection,
  onCardChange,
  openCard,
  proposalBuildMode,
  adminMode,
}) => {
  const { cards } = section;
  const numOfCards = cards.length;
  const sortedCards = sortBy(cards, item => item.position);

  const [cardName, setCardName] = useState('');
  const [createCard, createCardState] = useMutation(CREATE_CARD_MUTATION);
  const [updateCard, updateCardState] = useMutation(UPDATE_CARD_MUTATION);
  const [deleteCard, deleteCardState] = useMutation(DELETE_CARD);

  const onUpdateCard = (id, boardId, sectionId, position, isDiffColumn) => {
    updateCard({
      variables: {
        id,
        boardId,
        sectionId,
        position,
      },
      update: (cache, { data: { updateProposalCard } }) => {
        // Read the data from our cache for this query.
        const data = cache.readQuery({
          query: BOARD_QUERY,
          variables: { id: boardId },
        });
        if (data) {
          let sections;
          if (isDiffColumn) {
            sections = data.proposalBoard.sections.map(section => {
              if (section.id == sectionId) {
                if (!section.cards) {
                  section.cards = [];
                }
                const newSection = {
                  ...section,
                  cards: [...section.cards, updateProposalCard],
                };
                return newSection;
              }
              const newFilteredSection = {
                ...section,
                cards: section.cards.filter(card => card.id !== id),
              };
              return newFilteredSection;
            });
          } else {
            sections = data.proposalBoard.sections.map(section => {
              if (section.id == sectionId) {
                const cards = section.cards.map(card => {
                  if (card.id == id) {
                    const newCard = { ...card, ...updateProposalCard };
                    return newCard;
                  }
                  return card;
                });
                const newSection = {
                  ...section,
                  cards,
                };
                return newSection;
              }
              return section;
            });
          }

          cache.writeQuery({
            query: BOARD_QUERY,
            variables: { id: boardId },
            data: {
              proposalBoard: {
                ...data?.proposalBoard,
                sections,
              },
            },
          });
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateProposalCard: {
          __typename: 'ProposalCard',
          id,
          position,
          section: {
            __typename: 'ProposalSection',
            id: sectionId,
          },
        },
      },
    });
  };

  const calculatePosition = (removedIndex, addedIndex, arr) => {
    let position;
    if (addedIndex === arr.length - 1) {
      position = arr[arr.length - 1].position + 16384;
    } else if (addedIndex === 0) {
      position = arr[0].position / 2;
    } else if (addedIndex < removedIndex) {
      const beforePOS = arr[addedIndex - 1].position;
      const afterPOS = arr[addedIndex].position;
      position = (beforePOS + afterPOS) / 2;
    } else if (addedIndex > removedIndex) {
      const beforePOS = arr[addedIndex + 1].position;
      const afterPOS = arr[addedIndex].position;
      position = (beforePOS + afterPOS) / 2;
    }
    return position;
  };

  const onCardDrop = (columnId, addedIndex, removedIndex, payload) => {
    let updatedPOS;
    if (addedIndex !== null && removedIndex !== null) {
      if (addedIndex === removedIndex) {
        return;
      }
      const boardCards = sections.filter(p => p.id === columnId)[0];

      updatedPOS = calculatePosition(
        removedIndex,
        addedIndex,
        boardCards.cards
      );

      let newCards = cards.map(item => {
        if (item.id === payload.id) {
          return {
            ...item,
            position: updatedPOS,
          };
        }
        return item;
      });
      newCards = sortBy(newCards, item => item.position);
      const positions = newCards.map(card => card.position);

      onCardChange(columnId, newCards);
      onUpdateCard(payload.id, boardId, columnId, updatedPOS, false);
    } else if (removedIndex !== null) {
      const newCards = cards.filter(item => item.id !== payload.id);
      onCardChange(columnId, newCards);
    } else if (addedIndex !== null) {
      const newColumn = sections.filter(p => p.id === columnId)[0];
      const columnIndex = sections.indexOf(newColumn);

      if (newColumn.cards.length === 0) {
        updatedPOS = 16384;
      } else if (addedIndex === 0) {
        updatedPOS = newColumn.cards[0].position / 2;
      } else if (addedIndex === newColumn.cards.length) {
        updatedPOS =
          newColumn.cards[newColumn.cards.length - 1].position + 16384;
      } else {
        const afterCardPOS = newColumn.cards[addedIndex].position;
        const beforeCardPOS = newColumn.cards[addedIndex - 1].position;
        updatedPOS = (afterCardPOS + beforeCardPOS) / 2;
      }

      let newCards = cards.concat({ ...payload, position: updatedPOS });

      newCards = sortBy(newCards, item => item.position);
      onCardChange(columnId, newCards);
      onUpdateCard(payload.id, boardId, columnId, updatedPOS, true);
    }
  };

  const addCardMutation = async (sectionId, title) => {
    if (!title) {
      return alert('Please enter a title');
    }
    setCardName('');
    const newCard = await createCard({
      variables: {
        boardId,
        title,
        sectionId,
        position:
          cards && cards.length > 0
            ? cards[cards.length - 1].position + 16384
            : 16384,
      },
      update: (cache, { data: { createProposalCard } }) => {
        const data = cache.readQuery({
          query: BOARD_QUERY,
          variables: { id: boardId },
        });
        if (data) {
          const sections = data.proposalBoard.sections.map(section => {
            if (section.id === sectionId) {
              if (!section.cards) {
                section.cards = [];
              }
              const newSection = {
                ...section,
                cards: [...section.cards, createProposalCard],
              };
              return newSection;
            }
            return section;
          });

          cache.writeQuery({
            query: BOARD_QUERY,
            variables: { id: boardId },
            data: {
              proposalBoard: {
                ...data?.proposalBoard,
                sections,
              },
            },
          });
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createProposalCard: {
          __typename: 'ProposalCard',
          id: uuidv1(),
          boardId,
          title,
          content: null,
          position:
            cards && cards.length > 0
              ? cards[cards.length - 1].position + 16384
              : 16384,
          section: {
            __typename: 'ProposalSection',
            id: sectionId,
          },
        },
      },
    });
    openCard(newCard?.data?.createProposalCard?.id);
  };

  const deleteCardMutation = id => {
    deleteCard({
      variables: {
        id,
        boardId,
      },
      update: (cache, payload) => {
        cache.evict({ id: cache.identify(payload.data.deleteProposalCard) });
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteProposalCard: {
          id,
          __typename: 'ProposalCard',
          section: null,
        },
      },
    });
  };

  return (
    <StyledSection>
      <div className="column-drag-handle">
        <h3>{ReactHTMLParser(section.title)}</h3>
      </div>
      <div className="infoLine">
        <div>
          {numOfCards} card{numOfCards <= 1 ? '' : 's'}
        </div>
        <div
          className="deleteBtn"
          onClick={() => {
            const title = prompt('Please enter a new title');
            if (title != null) {
              onUpdateSection({
                variables: {
                  id: section.id,
                  boardId,
                  title,
                },
              });
            }
          }}
        >
          Edit title
        </div>
        <div
          className="deleteBtn"
          onClick={() => {
            if (section?.cards?.length === 0) {
              deleteSection(section.id);
              return;
            }
            if (
              confirm(
                'Are you sure you want to delete this proposal section? All cards in this section will be deleted as well. This action cannot be undone.'
              )
            ) {
              deleteSection(section.id);
            }
          }}
        >
          Delete section
        </div>
      </div>

      <div>
        <Container
          orientation="vertical"
          groupName="col"
          onDrop={e => {
            onCardDrop(section.id, e.addedIndex, e.removedIndex, e.payload);
          }}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          onDragEnter={() => {}}
          getChildPayload={index => cards[index]}
          onDragLeave={() => {}}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'drop-preview',
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards && cards.length ? (
            cards.map(card => (
              <Card
                key={card.id}
                card={card}
                onDeleteCard={deleteCardMutation}
                boardId={boardId}
                openCard={openCard}
                proposalBuildMode={proposalBuildMode}
                adminMode={adminMode}
              />
            ))
          ) : (
            <div></div>
          )}
        </Container>
      </div>
      <StyledNewInput>
        <label htmlFor={`input-${section.id}`}>
          <div>New card</div>
          <input
            id={`input-${section.id}`}
            type="text"
            name={`input-${section.id}`}
            value={cardName}
            onChange={e => setCardName(e.target.value)}
          />
        </label>

        <div
          className="addBtn"
          onClick={() => {
            addCardMutation(section.id, cardName);
          }}
        >
          Add card
        </div>
      </StyledNewInput>
    </StyledSection>
  );
};

export default Section;
