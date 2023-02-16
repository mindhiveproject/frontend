import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";

import styled from "styled-components";
import Note from "../../Jodit/note";

import { MY_ASSIGNMENTS, CLASS_ASSIGNMENTS } from "../../../Queries/Assignment";
import { CREATE_NEW_ASSIGNMENT } from "../../../Mutations/Assignment";

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

class AddAssignment extends Component {
  state = {
    title: this.props.template?.title || "",
    content: this.props.template?.content || "",
    classId: [this.props.classId],
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
    return (
      <StyledSelectionScreen>
        <div className="header">
          <div></div>
          <div className="closeBtn">
            <span onClick={this.props.goBack}>&times;</span>
          </div>
        </div>
        <ClassSelector
          classId={this.state.classId}
          handleClassChange={this.handleClassChange}
        />
        <Mutation
          mutation={CREATE_NEW_ASSIGNMENT}
          variables={this.state}
          refetchQueries={[
            { query: CLASS_ASSIGNMENTS, variables: { id: this.props.classId } },
            { query: MY_ASSIGNMENTS, variables: { id: this.props.user.id } },
          ]}
        >
          {(createAssignment, { loading, error }) => (
            <Note
              onSubmit={async (e) => {
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
          )}
        </Mutation>
      </StyledSelectionScreen>
    );
  }
}

export default AddAssignment;
