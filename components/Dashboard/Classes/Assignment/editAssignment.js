import React, { Component, useState, useRef } from "react";
import styled from "styled-components";
import { Mutation, Query } from "@apollo/client/react/components";

import Note from "../../Jodit/note";

import {
  CLASS_ASSIGNMENTS,
  GET_ONE_ASSIGNMENT,
} from "../../../Queries/Assignment";
import { UPDATE_ASSIGNMENT } from "../../../Mutations/Assignment";
import ClassSelector from "./ClassSelector";

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

class EditAssignment extends Component {
  state = {
    id: this.props.assignmentId,
    classId: undefined,
  };

  handleTitleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  handleContentChange = (content) => {
    if (content) {
      this.setState({
        content,
      });
    }
  };

  handleClassChange = ({ classId }) => {
    this.setState({
      classId,
    });
  };

  render() {
    const classQueries = this.props.user.teacherIn.map((myclass) => ({
      query: CLASS_ASSIGNMENTS,
      variables: { id: myclass?.id },
    }));

    return (
      <>
        <Query
          query={GET_ONE_ASSIGNMENT}
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
                <div className="header">
                  <div></div>
                  <div className="closeBtn">
                    <div onClick={this.props.goBack}>&times;</div>
                  </div>
                </div>
                <ClassSelector
                  classId={
                    this.state.classId || assignment.classes.map((c) => c?.id)
                  }
                  handleClassChange={this.handleClassChange}
                />
                <Mutation
                  mutation={UPDATE_ASSIGNMENT}
                  variables={this.state}
                  refetchQueries={[
                    {
                      query: GET_ONE_ASSIGNMENT,
                      variables: { id: this.props.assignmentId },
                    },
                    ...classQueries,
                  ]}
                >
                  {(updatePost, { loading, error }) => (
                    <>
                      <Note
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const res = await updatePost();
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
      </>
    );
  }
}

export default EditAssignment;
