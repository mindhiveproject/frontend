import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import styled from 'styled-components';
import Note from '../../Jodit/note';

import { CLASS_ASSIGNMENTS } from './wrapper';

const CREATE_NEW_ASSIGNMENT = gql`
  mutation CREATE_NEW_ASSIGNMENT(
    $title: String
    $content: String
    $settings: Json
    $classId: ID
  ) {
    createAssignment(
      title: $title
      content: $content
      settings: $settings
      classId: $classId
    ) {
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

class AddAssignment extends Component {
  state = {
    title: '',
    content: '',
    classId: this.props.classId,
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
          mutation={CREATE_NEW_ASSIGNMENT}
          variables={this.state}
          refetchQueries={[
            { query: CLASS_ASSIGNMENTS, variables: { id: this.props.classId } },
          ]}
        >
          {(createAssignment, { loading, error }) => (
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
                  const res = await createAssignment();
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

export default AddAssignment;
