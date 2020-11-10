import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Inner from './inner';

const Board = ({ blocks, openTaskEditor, viewing, updateComponents }) => {
  const updateComponentsWithBlocks = blocks => {
    const components = { blocks };
    updateComponents(components);
  };

  const createBlock = title => {
    const newBlocks = [
      ...blocks,
      {
        blockId: uniqid.time(),
        title,
        tests: [],
      },
    ];
    updateComponentsWithBlocks(newBlocks);
  };

  const updateBlock = () => {
    // console.log('onUpdateBlock');
  };

  const deleteBlock = id => {
    const newBlocks = blocks.filter(block => block.blockId !== id);
    updateComponentsWithBlocks(newBlocks);
  };

  const createTest = (blockId, title) => {
    const newBlocks = blocks.map(block => {
      if (block.blockId === blockId) {
        block.tests.push({
          testId: uniqid.time(),
          title,
        });
        return block;
      }
      return block;
    });
    updateComponentsWithBlocks(newBlocks);
  };

  const updateTest = () => {};

  const deleteTest = (blockId, testId) => {
    const newBlocks = blocks.map(block => {
      if (block.blockId === blockId) {
        block.tests = block.tests.filter(test => test.testId !== testId);
        return block;
      }
      return block;
    });
    updateComponentsWithBlocks(newBlocks);
  };

  return (
    <div>
      <Inner
        blocks={blocks}
        onSetBlocks={updateComponentsWithBlocks}
        onCreateBlock={createBlock}
        onUpdateBlock={updateBlock}
        onDeleteBlock={deleteBlock}
        onCreateTest={createTest}
        onUpdateTest={updateTest}
        onDeleteTest={deleteTest}
        openTaskEditor={openTaskEditor}
        viewing={viewing}
      />
    </div>
  );
};

export default Board;
