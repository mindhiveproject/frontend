import React, { Component, useState, useRef } from 'react';
import styled from 'styled-components';
import { Mutation, Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import Note from '../../Jodit/note';

import { TAGS_QUERY } from '../../../Queries/Tag';

const GET_TAG = gql`
  query GET_TAG($id: ID!) {
    tag(where: { id: $id }) {
      id
      title
      description
    }
  }
`;

const UPDATE_TAG = gql`
  mutation UPDATE_TAG($id: ID!, $title: String, $description: String) {
    updateTag(id: $id, title: $title, description: $description) {
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

class EditTag extends Component {
  state = {
    id: this.props.tag.id,
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
      <>
        <Query query={GET_TAG} variables={{ id: this.state.id }}>
          {({ data, loading }) => {
            if (loading) return <p>Loading ... </p>;
            if (!data || !data.tag)
              return <p>No tag found for id {this.state.id}</p>;
            const { tag } = data;
            return (
              <StyledSelectionScreen>
                <div className="header">
                  <div></div>
                  <div className="closeBtn">
                    <div onClick={this.props.goBack}>&times;</div>
                  </div>
                </div>
                <Mutation
                  mutation={UPDATE_TAG}
                  variables={this.state}
                  refetchQueries={[
                    {
                      query: TAGS_QUERY,
                    },
                    {
                      query: GET_TAG,
                      variables: { id: this.state.id },
                    },
                  ]}
                >
                  {(updatePost, { loading, error }) => (
                    <>
                      <Note
                        onSubmit={async e => {
                          e.preventDefault();
                          const res = await updatePost();
                          this.props.goBack();
                        }}
                        loading={loading}
                        title={this.state.title || tag.title}
                        onTitleChange={this.handleTitleChange}
                        content={this.state.description || tag.description}
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
      </>
    );
  }
}

export default EditTag;
