import React, { Component, useState, useRef } from 'react';
import styled from 'styled-components';
import { Mutation, Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import Note from '../../Jodit/note';

import { MY_ASSIGNMENT_HOMEWORKS } from './assignmentTab';

const GET_ASSIGNMENT = gql`
  query GET_ASSIGNMENT($id: ID!) {
    assignment(where: { id: $id }) {
      id
      title
      content
    }
  }
`;

const CREATE_HOMEWORK = gql`
  mutation CREATE_HOMEWORK(
    $assignmentId: ID!
    $title: String
    $content: String
    $settings: Json
  ) {
    createHomework(
      assignmentId: $assignmentId
      title: $title
      content: $content
      settings: $settings
    ) {
      id
    }
  }
`;

const StyledSelectionScreen = styled.div`
  display: grid;
  background: #f7f9f8;
`;

const StyledEditor = styled.div`
  .header {
    display: grid;
    justify-content: end;
  }
  .closeBtn {
    line-height: 3rem;
    text-align: center;
    cursor: pointer;
    border-radius: 2.25rem;
    color: #5f6871;
    font-size: 2rem;
    cursor: pointer;
    :hover {
      transform: scale(1.5);
      transition: transform 0.5s;
      color: red;
    }
  }
`;

class EditAssignment extends Component {
  state = {
    id: this.props.assignmentId,
    classId: this.props.classId,
    assignmentId: this.props.assignmentId,
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
      <StyledEditor>
        <div className="header">
          <div className="closeBtn">
            <div onClick={this.props.goBack}>&times;</div>
          </div>
        </div>
        <Query
          query={GET_ASSIGNMENT}
          variables={{ id: this.props.assignmentId }}
        >
          {({ data, loading }) => {
            if (loading) return <p>Loading ... </p>;
            if (!data || !data.assignment)
              return (
                <p>No assignment found for id {this.props.assignmentId}</p>
              );
            const { assignment } = data;
            return (
              <StyledSelectionScreen>
                <Mutation
                  mutation={CREATE_HOMEWORK}
                  refetchQueries={[
                    {
                      query: GET_ASSIGNMENT,
                      variables: { id: this.props.assignmentId },
                    },
                    {
                      query: MY_ASSIGNMENT_HOMEWORKS,
                      variables: { id: this.props.assignmentId },
                    },
                  ]}
                >
                  {(createHomework, { loading, error }) => (
                    <>
                      <Note
                        onSubmit={async e => {
                          e.preventDefault();
                          const res = await createHomework({
                            variables: {
                              title: assignment.title,
                              content: assignment.content,
                              ...this.state,
                            },
                          });
                          this.props.goBack();
                        }}
                        loading={loading}
                        title={this.state.title || assignment.title}
                        onTitleChange={this.handleTitleChange}
                        content={this.state.content || assignment.content}
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
      </StyledEditor>
    );
  }
}

export default EditAssignment;
