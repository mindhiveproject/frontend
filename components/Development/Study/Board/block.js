import React, { Component, useState } from 'react';
import sortBy from 'lodash/sortBy';

import { Container, Draggable } from 'react-smooth-dnd';
import styled from 'styled-components';
import Test from './test';

const StyledBlock = styled.div`
  border: 1px solid #43dacb;
  border-radius: 4px;
  min-height: 100px;
  .column-drag-handle {
    background: #fef3cd;
    cursor: move;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 10px;
    justify-items: end;
    padding: 5px;
    border-radius: 4px;
  }
  .test-drop-preview {
    background: white;
    border: 2px solid #007c70;
    border-radius: 4px;
  }
  .dragged-test {
    transform: rotate(2deg);
  }
  .deleteBtn {
    display: grid;
    align-content: center;
    width: 35px;
    height: 35px;
    /* line-height: 2.5rem; */
    text-align: center;
    padding: 15px 10px;
    cursor: pointer;
    border-radius: 20px;
    border: 1px solid #cccccc;
    /* background-color: #4fbf1f; */
    color: #666666;
    /* padding-bottom: 5px; */
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

      <div>
        <Container
          orientation="vertical"
          groupName="col"
          // onDragStart={(e) => console.log("Drag Started")}
          // onDragEnd={(e) => console.log("drag end", e)}
          onDrop={e => {
            onTestDrop(block.blockId, e.addedIndex, e.removedIndex, e.payload);
          }}
          dragClass="dragged-test"
          dropClass="test-ghost-drop"
          onDragEnter={() => {
            // console.log("drag enter:", item.id);
          }}
          getChildPayload={index => tests[index]}
          onDragLeave={() => {
            // console.log("drag leave:", item.id);
          }}
          // onDropReady={(p) => console.log("Drop ready: ", p)}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'test-drop-preview',
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {tests && tests.length ? (
            tests.map(test => (
              <Draggable key={test.testId}>
                <Test
                  key={test.testId}
                  test={test}
                  onDeleteTest={deleteTestMutation}
                  openTaskEditor={openTaskEditor}
                  viewing={viewing}
                />
              </Draggable>
            ))
          ) : (
            <div></div>
          )}
        </Container>
      </div>
    </StyledBlock>
  );
};

export default Block;

// {false && (
//   <div>
//     <label>
//       Test name:
//       <input
//         type="text"
//         value={testName}
//         onChange={e => setTestName(e.target.value)}
//       />
//     </label>
//     <button
//       onClick={() => {
//         addTest(block.blockId, testName);
//       }}
//     >
//       + Test
//     </button>
//   </div>
// )}
