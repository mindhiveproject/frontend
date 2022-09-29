import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { MY_TALKS_QUERY } from '../../../Queries/Talk';

import { StyledCreateChatForm } from '../../../Styles/Forms';
import FindMember from './findMember';

const ADD_NEW_MEMBERS_TO_TALK = gql`
  mutation ADD_NEW_MEMBERS_TO_TALK($id: ID!, $members: [ID]!) {
    addMembersToTalk(id: $id, members: $members) {
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

class AddMembersToTalk extends Component {
  state = {
    id: this.props.chatId,
    members: [],
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

  render() {
    return (
      <StyledSelectionScreen>
        <Mutation
          mutation={ADD_NEW_MEMBERS_TO_TALK}
          variables={this.state}
          refetchQueries={[{ query: MY_TALKS_QUERY }]}
        >
          {(addMembersToTalk, { loading, error }) => (
            <>
              <div className="header">
                <div></div>
                <div className="closeBtn">
                  <span onClick={this.props.goBack}>&times;</span>
                </div>
              </div>

              <StyledCreateChatForm
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await addMembersToTalk();
                  this.props.goBack();
                }}
              >
                <h2>
                  Add new members to the group chat {this.props.talkTitle}
                </h2>
                <fieldset disabled={loading} aria-busy={loading}>
                  <div className="membersBlock">
                    <p>Members</p>
                    <FindMember
                      members={this.state.members}
                      handleSetState={this.handleSetState}
                    />
                  </div>
                  <button type="submit">Add</button>
                </fieldset>
              </StyledCreateChatForm>
            </>
          )}
        </Mutation>
      </StyledSelectionScreen>
    );
  }
}

export default AddMembersToTalk;
