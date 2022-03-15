import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { MY_TALKS_QUERY } from './chatsList';

import { StyledSubmitForm } from '../../../Styles/Forms';
import FindMember from './findMember';
import FindClassMembers from './findClassMembers';
import FindStudyMembers from './findStudyMembers';

const CREATE_NEW_TALK = gql`
  mutation CREATE_NEW_TALK($members: [ID]!, $settings: Json) {
    createTalk(members: $members, settings: $settings) {
      id
    }
  }
`;

const StyledSelectionScreen = styled.div`
  display: grid;
  height: 100vh;
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

class AddChat extends Component {
  state = {
    members: [],
    classes: [],
    studies: [],
    settings: {},
  };

  handleSettingsChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      settings: { ...this.state.settings, [name]: val },
    });
  };

  handleSetState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleClassChange = (name, value, members) => {
    const updatedMembers = [...new Set([...this.state.members, ...members])];
    this.setState({
      classes: value,
      members: updatedMembers,
    });
  };

  handleStudyChange = (name, value, members) => {
    const updatedMembers = [...new Set([...this.state.members, ...members])];
    this.setState({
      studies: value,
      members: updatedMembers,
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

              <StyledSubmitForm
                onSubmit={async e => {
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
                      handleClassChange={this.handleClassChange}
                    />
                  </div>

                  <div className="membersBlock">
                    <p>Add by study</p>
                    <FindStudyMembers
                      studies={this.state.studies}
                      handleStudyChange={this.handleStudyChange}
                    />
                  </div>

                  <div className="membersBlock">
                    <p>The following MinHive members will be invited</p>
                    <FindMember
                      members={this.state.members}
                      handleSetState={this.handleSetState}
                    />
                  </div>
                  <button type="submit">Create</button>
                </fieldset>
              </StyledSubmitForm>
            </>
          )}
        </Mutation>
      </StyledSelectionScreen>
    );
  }
}

export default AddChat;
