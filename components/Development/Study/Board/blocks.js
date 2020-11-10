import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import styled from 'styled-components';
import Block from './block';

const StyledBlocks = styled.div`
  display: grid;
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
  onColumnDrop = ({ removedIndex, addedIndex, payload }) => {
    if (this.props.blocks) {
      const sortedBlocks = [...this.props.blocks];
      sortedBlocks[removedIndex] = this.props.blocks[addedIndex];
      sortedBlocks[addedIndex] = this.props.blocks[removedIndex];
      this.props.onSetBlocks([...sortedBlocks]);
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
        <Container
          onDrop={this.onColumnDrop}
          orientation="horizontal"
          lockAxis="x"
          onDragStart={() => {
            // console.log('on drag start');
          }}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'block-drop-preview',
          }}
          getChildPayload={index => blocks[index]}
          dragHandleSelector=".column-drag-handle"
          dragClass="dragged-block"
        >
          {blocks.map(block => (
            <Draggable key={block.blockId}>
              <Block
                blocks={blocks}
                block={block}
                deleteBlock={this.props.deleteBlock}
                onTestChange={this.onTestChange}
                onCreateTest={this.props.onCreateTest}
                onUpdateTest={this.props.onUpdateTest}
                onDeleteTest={this.props.onDeleteTest}
                openTaskEditor={this.props.openTaskEditor}
                viewing={this.props.viewing}
              />
            </Draggable>
          ))}
        </Container>
      </StyledBlocks>
    );
  }
}

export default Blocks;
