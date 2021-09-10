import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { MY_TALKS_QUERY } from './list';

import { StyledSubmitForm } from '../../../Styles/Forms';
import FindMember from './findMember';

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

class AddTalk extends Component {
  state = {
    members: [],
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

  // handleMembersChange = e => {
  //   const { name, value } = e.target;
  //   const members = [...this.state.members];
  //   members[name] = value;
  //   if (name == members.length - 1) {
  //     members.push('');
  //   }
  //   this.setState({
  //     members,
  //   });
  // };

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
                <h1>Create a new talk</h1>
                <fieldset disabled={loading} aria-busy={loading}>
                  <label htmlFor="title">
                    <p>Talk title</p>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleSettingsChange}
                      required
                    />
                  </label>
                  <label htmlFor="description">
                    <p>Description</p>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleSettingsChange}
                      required
                    />
                  </label>
                  <FindMember
                    members={this.state.members}
                    handleSetState={this.handleSetState}
                  />
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

export default AddTalk;
