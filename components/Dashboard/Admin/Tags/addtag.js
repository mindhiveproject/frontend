import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import styled from 'styled-components';
import Note from '../../Jodit/note';

import { TAGS_QUERY } from '../../../Queries/Tag';

const CREATE_NEW_TAG = gql`
  mutation CREATE_NEW_TAG($title: String!, $description: String) {
    createTag(title: $title, description: $description) {
      id
    }
  }
`;

const StyledSelectionScreen = styled.div`
  display: grid;
  background: #f7f9f8;
  .header {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .closeBtn {
    line-height: 3rem;
    text-align: center;
    cursor: pointer;
    border-radius: 2.25rem;
    color: #5f6871;
    font-size: 2rem;
    :hover {
      transform: scale(1.5);
      transition: transform 0.5s;
      color: red;
    }
  }
`;

class AddTag extends Component {
  state = {
    title: '',
    description: '',
  };

  handleTitleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  handleContentChange = description => {
    if (description) {
      this.setState({
        description,
      });
    }
  };

  render() {
    return (
      <StyledSelectionScreen>
        <div className="header">
          <div></div>
          <div className="closeBtn">
            <span onClick={this.props.goBack}>&times;</span>
          </div>
        </div>
        <Mutation
          mutation={CREATE_NEW_TAG}
          variables={this.state}
          refetchQueries={[{ query: TAGS_QUERY }]}
        >
          {(createTag, { loading, error }) => (
            <Note
              onSubmit={async e => {
                e.preventDefault();
                const res = await createTag();
                this.props.goBack();
              }}
              loading={loading}
              title={this.state.title}
              onTitleChange={this.handleTitleChange}
              content={this.state.description}
              onContentChange={this.handleContentChange}
              btnName="Save"
            />
          )}
        </Mutation>
      </StyledSelectionScreen>
    );
  }
}

export default AddTag;
