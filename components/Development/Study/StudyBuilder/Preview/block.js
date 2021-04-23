import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import ReactHtmlParser from 'react-html-parser';
import { Container, Draggable } from 'react-smooth-dnd';
import ComponentPane from './componentPane';

const StyledBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-gap: 10px;
  border: 1px solid grey;
  padding: 10px;
  border-radius: 4px;
`;

const StyledOuterBlock = styled.div`
  display: grid;
  grid-template-columns: auto 40px;
  align-items: center;
  .block-drag-handle {
    cursor: pointer;
    font-size: 3rem;
  }
  .plusSign {
    cursor: pointer;
    font-size: 3rem;
    padding: 1rem;
  }
`;

const StyledBetweenBlock = styled.div`
  display: grid;
  grid-gap: 5px;
  border: 1px solid grey;
  align-items: baseline;
  align-content: baseline;
  border-radius: 4px;
  justify-items: center;
`;

class Block extends Component {
  addBetweenBlock = () => {
    const { block, blockNumber } = this.props;
    let newBlock;
    if (block.between) {
      newBlock = {
        between: [...block.between, { within: [] }],
      };
    } else {
      newBlock = {
        between: [{ within: [this.props.block] }, { within: [] }],
      };
    }
    this.props.onUpdateBlock(newBlock, blockNumber);
  };

  addWithinBlock = betweenNumber => {
    const { block, blockNumber } = this.props;
    // console.log('block', betweenNumber, block);
    let newBlock;
    if (block.between) {
      newBlock = { ...block };
      newBlock.between[betweenNumber].within = [
        ...block.between[betweenNumber].within,
        {},
      ];
    } else {
      newBlock = {
        between: [{ within: [this.props.block, {}] }],
      };
    }
    this.props.onUpdateBlock(newBlock, blockNumber);
  };

  removeComponent = (component, blockNumber, betweenNumber, withinNumber) => {
    const { block } = this.props;
    block.between[betweenNumber].within.splice(withinNumber, 1);
    this.props.onUpdateBlock(block, blockNumber);
  };

  removeBetweenBlock = (blockNumber, betweenNumber) => {
    const { block } = this.props;
    block.between.splice(betweenNumber, 1);
    this.props.onUpdateBlock(block, blockNumber);
  };

  render() {
    const { block } = this.props;

    return (
      <StyledOuterBlock>
        <StyledBlock>
          {!block.between && (
            <ComponentPane
              key={this.props.num}
              blockNumber={this.props.blockNumber}
              component={this.props.block}
              onRemoveWholeComponent={this.props.onRemoveComponent}
              openTaskEditor={this.props.openTaskEditor}
              viewing={this.props.viewing}
            />
          )}
          {block.between && block.between.length === 0 && (
            <div>
              <button
                onClick={() =>
                  this.props.onRemoveComponent(this.props.blockNumber)
                }
              >
                &times;
              </button>
            </div>
          )}
          {block.between &&
            block.between.map((betweenBlock, betweenNumber) => (
              <Container
                onDrop={this.props.onDrop}
                dragHandleSelector=".card-drag-handle"
              >
                <StyledBetweenBlock>
                  {betweenBlock.within.length === 0 && (
                    <div>
                      <button
                        onClick={() =>
                          this.removeBetweenBlock(
                            this.props.blockNumber,
                            betweenNumber
                          )
                        }
                      >
                        &times;
                      </button>
                    </div>
                  )}
                  {betweenBlock.within.length > 0 && (
                    <WithinBlock
                      key={betweenNumber}
                      blockNumber={this.props.blockNumber}
                      betweenNumber={betweenNumber}
                      betweenBlock={betweenBlock}
                      onRemoveComponent={this.removeComponent}
                      openTaskEditor={this.props.openTaskEditor}
                    />
                  )}

                  <div
                    className="plusSign"
                    onClick={() => this.addWithinBlock(betweenNumber)}
                  >
                    ➕
                  </div>
                </StyledBetweenBlock>
              </Container>
            ))}
        </StyledBlock>

        <div className="plusSign" onClick={this.addBetweenBlock}>
          ➕
        </div>
      </StyledOuterBlock>
    );
  }
}

class WithinBlock extends Component {
  render() {
    const {
      betweenBlock: { within },
    } = this.props;
    return (
      <>
        {within.map((component, withinNumber) => (
          <Draggable key={component.id}>
            <div className="card-drag-handle">🤚</div>
            <ComponentPane
              key={withinNumber}
              blockNumber={this.props.blockNumber}
              betweenNumber={this.props.betweenNumber}
              withinNumber={withinNumber}
              component={component}
              onRemoveComponent={this.props.onRemoveComponent}
              openTaskEditor={this.props.openTaskEditor}
              viewing={this.props.viewing}
            />
          </Draggable>
        ))}
      </>
    );
  }
}

export default Block;
