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
        skip: false,
      },
    ];
    updateComponentsWithBlocks(newBlocks);
  };

  const updateBlock = () => {
    // console.log('onUpdateBlock');
  };

  const updateBlockTitle = ({ id, title }) => {
    const newBlocks = blocks.map(block => {
      if (block.blockId === id) {
        return { ...block, title };
      }
      return block;
    });
    updateComponentsWithBlocks(newBlocks);
  };

  const updateBlockStatus = ({ id, skip }) => {
    const newBlocks = blocks.map(block => {
      if (block.blockId === id) {
        return { ...block, skip };
      }
      return block;
    });
    updateComponentsWithBlocks(newBlocks);
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
    const newBlocks = [...blocks].map(block => {
      if (block.blockId === blockId) {
        const tests = block.tests.filter(test => test.testId !== testId);
        return { ...block, tests };
      }
      return block;
    });
    updateComponentsWithBlocks(newBlocks);
  };

  return (
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
      updateBlockTitle={updateBlockTitle}
      updateBlockStatus={updateBlockStatus}
    />
  );
};

export default Board;
