import React, { Component, useState } from 'react';
import sortBy from 'lodash/sortBy';

import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Radio } from 'semantic-ui-react';
import Test from './test';

const TestsList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'white' : '#e5e5e5')};
  display: grid;
  min-height: 100px;
  align-content: baseline;
`;

const StyledBlock = styled.div`
  border: 1px solid #43dacb;
  border-radius: 4px;
  display: grid;
  grid-template-rows: 50px auto;
  .column-drag-handle {
    background: #fef3cd;
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    align-items: center;
    grid-gap: 10px;
    justify-items: end;
    padding: 5px;
    border-radius: 4px;
    height: 50px;
    .toggleInfo  {
      display: grid;
      grid-gap: 0.5rem;
      grid-template-columns: 1fr auto;
    }
  }
  .deleteBtn {
    display: grid;
    align-content: center;
    width: 35px;
    height: 35px;
    text-align: center;
    padding: 15px 10px;
    cursor: pointer;
    border-radius: 20px;
    border: 1px solid #cccccc;
    color: #666666;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    :hover {
      color: white;
      background-color: #ea0707;
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
`;

const Block = ({
  block,
  blocks,
  updateBlockTitle,
  updateBlockStatus,
  deleteBlock,
  onTestChange,
  onCreateTest,
  onUpdateTest,
  onDeleteTest,
  openTaskEditor,
  viewing,
}) => {
  const { tests } = block;
  const [testName, setTestName] = useState('');

  const onTestDrop = (blockId, addedIndex, removedIndex, payload) => {
    if (addedIndex !== null && removedIndex !== null) {
      if (addedIndex === removedIndex) {
        return;
      }
      const newTests = [...tests];
      newTests.splice(removedIndex, 1);
      newTests.splice(addedIndex, 0, tests[removedIndex]);
      onTestChange(blockId, newTests);
    } else if (removedIndex !== null) {
      // find the block with this test
      const newTests = tests.filter(item => item.testId !== payload.testId);
      onTestChange(block.blockId, newTests);
    } else if (addedIndex !== null) {
      const newTests = [...tests];
      newTests.splice(addedIndex, 0, { ...payload });
      onTestChange(blockId, newTests);
    }
  };

  const addTest = (blockId, title) => {
    setTestName('');
    onCreateTest(blockId, title);
  };

  const deleteTestMutation = id => {
    onDeleteTest(block.blockId, id);
  };

  return (
    <StyledBlock>
      <div className="column-drag-handle">
        <div>
          <h1>{block.title}</h1>
        </div>
        <div className="toggleInfo">
          <Radio
            toggle
            checked={!block?.skip}
            onChange={() => {
              updateBlockStatus({ id: block.blockId, skip: !block?.skip });
            }}
          />
          <div>{block?.skip ? 'OFF' : 'ON'}</div>
        </div>
        <div
          className="deleteBtn"
          onClick={() => {
            const title = prompt('Please enter a new title');
            if (title != null) {
              updateBlockTitle({
                id: block.blockId,
                title,
              });
            }
          }}
        >
          ✏️
        </div>
        <div
          className="deleteBtn"
          onClick={() => {
            const r = confirm(
              'Are you sure you want to delete this between-subjects block?'
            );
            if (r == true) {
              deleteBlock(block.blockId);
            }
          }}
        >
          &times;
        </div>
      </div>

      <Droppable droppableId={block.blockId}>
        {(provided, snapshot) => (
          <TestsList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tests.map((test, index) => (
              <Test
                key={test.testId}
                test={test}
                onDeleteTest={deleteTestMutation}
                openTaskEditor={openTaskEditor}
                viewing={viewing}
                index={index}
              />
            ))}
            {provided.placeholder}
          </TestsList>
        )}
      </Droppable>
    </StyledBlock>
  );
};

export default Block;
