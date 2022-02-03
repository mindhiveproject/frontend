import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Block from './block';

const StyledBlocks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  border-radius: 4px;
  .block-drop-preview {
    background: white;
    border: 2px solid #007c70;
    border-radius: 4px;
  }
  .dragged-block {
    transform: rotate(2deg);
  }
`;

class Blocks extends Component {
  dragStart = () => {};

  dragUpdate = update => {};

  dragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const startBlock = this.props.blocks.filter(
      block => block.blockId === source.droppableId
    )[0];
    const finishBlock = this.props.blocks.filter(
      block => block.blockId === destination.droppableId
    )[0];

    if (startBlock.blockId === finishBlock.blockId) {
      const newTests = Array.from(startBlock.tests);
      const removedTest = newTests.splice(source.index, 1);
      newTests.splice(destination.index, 0, removedTest[0]);
      this.onTestChange(startBlock.blockId, newTests);
    } else {
      const startNewTests = Array.from(startBlock.tests);
      const removedStartTest = startNewTests.splice(source.index, 1);
      const finishNewTests = Array.from(finishBlock.tests);
      finishNewTests.splice(destination.index, 0, removedStartTest[0]);

      const newBlocks = this.props.blocks.map(block => {
        if (block.blockId === startBlock.blockId) {
          const updatedBlock = { ...block };
          updatedBlock.tests = startNewTests;
          return updatedBlock;
        }
        if (block.blockId === finishBlock.blockId) {
          const updatedBlock = { ...block };
          updatedBlock.tests = finishNewTests;
          return updatedBlock;
        }
        return block;
      });
      this.props.onSetBlocks([...newBlocks]);
    }
  };

  onTestChange = (blockId, newTests) => {
    const newBlocks = this.props.blocks.map(block => {
      if (block.blockId === blockId) {
        const updatedBlock = { ...block };
        updatedBlock.tests = newTests;
        return updatedBlock;
      }
      return block;
    });
    this.props.onSetBlocks([...newBlocks]);
  };

  render() {
    const { blocks } = this.props;
    return (
      <StyledBlocks>
        <DragDropContext
          onDragEnd={this.dragEnd}
          onDragStart={this.dragStart}
          onDragUpdate={this.dragUpdate}
        >
          {blocks.map((block, index) => (
            <Block
              key={index}
              blocks={blocks}
              block={block}
              updateBlockTitle={this.props.updateBlockTitle}
              updateBlockStatus={this.props.updateBlockStatus}
              deleteBlock={this.props.deleteBlock}
              onTestChange={this.onTestChange}
              onCreateTest={this.props.onCreateTest}
              onUpdateTest={this.props.onUpdateTest}
              onDeleteTest={this.props.onDeleteTest}
              openTaskEditor={this.props.openTaskEditor}
              viewing={this.props.viewing}
            />
          ))}
        </DragDropContext>
      </StyledBlocks>
    );
  }
}

export default Blocks;
