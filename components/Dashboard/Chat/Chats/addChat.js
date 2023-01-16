import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";

import { MY_TALKS_QUERY } from "../../../Queries/Talk";
import { CREATE_NEW_TALK } from "../../../Mutations/Talk";

import { StyledCreateChatForm } from "../../../Styles/Forms";
import FindMember from "./findMember";
import FindClassMembers from "./findClassMembers";
import FindStudyMembers from "./findStudyMembers";

const StyledSelectionScreen = styled.div`
  display: grid;
  height: 90vh;
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
      transform: scale(1.3);
      transition: transform 0.5s;
    }
  }
`;

class AddChat extends Component {
  state = {
    settings: {},
    members: [],
    classes: [],
    studies: [],
  };

  handleSettingsChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({
      settings: { ...this.state.settings, [name]: val },
    });
  };

  handleSetState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <StyledSelectionScreen>
        <Mutation
          mutation={CREATE_NEW_TALK}
          variables={this.state}
          refetchQueries={[{ query: MY_TALKS_QUERY }]}
        >
          {(createTalk, { loading, error }) => (
            <>
              <div className="header">
                <div></div>
                <div className="closeBtn">
                  <span onClick={this.props.goBack}>&times;</span>
                </div>
              </div>

              <StyledCreateChatForm
                onSubmit={async (e) => {
                  e.preventDefault();
                  const res = await createTalk();
                  this.props.goBack();
                }}
              >
                <h1>Create a new group chat</h1>
                <fieldset disabled={loading} aria-busy={loading}>
                  <label htmlFor="title">
                    <p>Title</p>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleSettingsChange}
                      required
                    />
                  </label>

                  <div className="membersBlock">
                    <p>Add by class</p>
                    <FindClassMembers
                      classes={this.state.classes}
                      handleClassChange={this.handleSetState}
                    />
                  </div>

                  <div className="membersBlock">
                    <p>Add by study</p>
                    <FindStudyMembers
                      studies={this.state.studies}
                      handleStudyChange={this.handleSetState}
                    />
                  </div>

                  <div className="membersBlock">
                    <p>Add by members</p>
                    <FindMember
                      members={this.state.members}
                      handleSetState={this.handleSetState}
                    />
                  </div>
                  <button type="submit">Create</button>
                </fieldset>
              </StyledCreateChatForm>
            </>
          )}
        </Mutation>
      </StyledSelectionScreen>
    );
  }
}

export default AddChat;
