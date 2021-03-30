import React, { Component, useState, useRef } from 'react';
import styled from 'styled-components';
import { Mutation, Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { JOURNAL_POSTS } from '../journalpage';
import { MY_JOURNALS_QUERY } from '../journals';

import Note from '../../Jodit/note';

const GET_POST = gql`
  query GET_POST($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      content
    }
  }
`;

const UPDATE_POST = gql`
  mutation UPDATE_POST($id: ID!, $title: String, $content: String) {
    updatePost(id: $id, title: $title, content: $content) {
      id
    }
  }
`;

const StyledSelectionScreen = styled.div`
  display: grid;
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

class EditPost extends Component {
  state = {
    id: this.props.postId,
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
      <Query query={GET_POST} variables={{ id: this.props.postId }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.post)
            return <p>No post found for id {this.props.postId}</p>;
          const { post } = data;
          return (
            <StyledSelectionScreen>
              <Mutation
                mutation={UPDATE_POST}
                variables={this.state}
                refetchQueries={[
                  {
                    query: JOURNAL_POSTS,
                    variables: { id: this.props.journalId },
                  },
                  { query: MY_JOURNALS_QUERY },
                ]}
              >
                {(updatePost, { loading, error }) => (
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
                        const res = await updatePost();
                        this.props.goBack();
                      }}
                      loading={loading}
                      title={this.state.title || post.title}
                      onTitleChange={this.handleTitleChange}
                      content={this.state.content || post.content}
                      onContentChange={this.handleContentChange}
                      btnName="Save"
                    />
                  </>
                )}
              </Mutation>
            </StyledSelectionScreen>
          );
        }}
      </Query>
    );
  }
}

export default EditPost;
