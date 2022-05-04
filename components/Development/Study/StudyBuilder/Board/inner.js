import React, { Component } from 'react';
import styled from 'styled-components';
import Blocks from './blocks';

const StyledGrid = styled.div`
  display: grid;
  .plusSign {
    cursor: pointer;
    font-size: 3rem;
    padding: 1rem;
    width: 50px;
  }
`;

const StyledInput = styled.div`
  display: grid;
  width: 50%;
  justify-self: end;
  justify-items: end;
  input {
    background: white;
  }
`;

class Inner extends Component {
  state = {
    title: '',
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  deleteBlock = id => {
    this.props.onDeleteBlock(id);
  };

  render() {
    const { blocks } = this.props;

    return (
      <StyledGrid>
        <Blocks
          blocks={blocks}
          onSetBlocks={this.props.onSetBlocks}
          updateBlockTitle={this.props.updateBlockTitle}
          updateBlockStatus={this.props.updateBlockStatus}
          deleteBlock={this.deleteBlock}
          onUpdateBlock={this.props.onUpdateBlock}
          onCreateTest={this.props.onCreateTest}
          onUpdateTest={this.props.onUpdateTest}
          onDeleteTest={this.props.onDeleteTest}
          openTaskEditor={this.props.openTaskEditor}
          viewing={this.props.viewing}
          togglePreview={this.props.togglePreview}
        />

        <StyledInput>
          <div>
            <label htmlFor="condition_title">
              New between-subjects condition
              <input
                type="text"
                id="condition_title"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>
          <button
            className="plusSign"
            onClick={() => {
              if (this.state.title) {
                this.props.onCreateBlock(this.state.title);
                this.setState({
                  title: '',
                });
              } else {
                alert(
                  'Please give a name to the new between-subjects condition'
                );
              }
            }}
          >
            +
          </button>
        </StyledInput>
      </StyledGrid>
    );
  }
}

export default Inner;
