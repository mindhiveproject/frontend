import React, { Component, useState, useRef } from 'react';
import styled from 'styled-components';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { JOURNAL_POSTS } from '../journalpage';
import { MY_JOURNALS_QUERY } from '../journals';

import Note from '../../Jodit/note';

const CREATE_NEW_POST = gql`
  mutation CREATE_NEW_POST($title: String, $content: String, $journal: ID!) {
    createPost(title: $title, content: $content, journal: $journal) {
      id
    }
  }
`;

const StyledSelectionScreen = styled.div`
  display: grid;
  /* height: 100vh; */
  margin: 30px;
  background: #f7f9f8;
  grid-template-rows: 0px auto;
  .header {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .closeBtn {
    width: 3.3rem;
    line-height: 3rem;
    text-align: center;
    cursor: pointer;
    border-radius: 2.25rem;
    color: #5f6871;
    padding-bottom: 5px;
    font-size: 2rem;
    :hover {
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
`;

class AddPost extends Component {
  state = {
    title: '',
    content: '',
    journal: this.props.journalId,
  };

  handleTitleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  handleContentChange = content => {
    if (content) {
      this.setState({
        content,
      });
    }
  };

  render() {
    return (
      <StyledSelectionScreen>
        <Mutation
          mutation={CREATE_NEW_POST}
          variables={this.state}
          refetchQueries={[
            { query: JOURNAL_POSTS, variables: { id: this.props.journalId } },
            { query: MY_JOURNALS_QUERY },
          ]}
        >
          {(createPost, { loading, error }) => (
            <>
              <div className="header">
                <div></div>
                <div className="closeBtn">
                  <span onClick={this.props.goBack}>&times;</span>
                </div>
              </div>
              <Note
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await createPost();
                  this.props.goBack();
                }}
                loading={loading}
                title={this.state.title}
                onTitleChange={this.handleTitleChange}
                content={this.state.content}
                onContentChange={this.handleContentChange}
                btnName="Save"
              />
            </>
          )}
        </Mutation>
      </StyledSelectionScreen>
    );
  }
}

export default AddPost;
