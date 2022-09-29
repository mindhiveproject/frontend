import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import styled from 'styled-components';

const StyledChatHeader = styled.div`
  display: grid;
  input,
  textarea,
  select {
    background: #f6f9f8;
    width: 100%;
    border: 0px solid #e6e6e6;
    border-radius: 4px;
    &:focus {
      outline: 0;
      background: white;
      border-color: mintcream;
    }
  }
  button {
    background: #007c70;
    color: white;
    max-width: 256px;
    border-radius: 3px;
    cursor: pointer;
  }
  .title {
    font-family: Lato;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: 56px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
    margin-bottom: 23px;
  }
`;

const UPDATE_CHAT_SETTINGS = gql`
  mutation UPDATE_CHAT_SETTINGS($id: ID!, $settings: Json) {
    updateChatSettings(id: $id, settings: $settings) {
      id
      settings
    }
  }
`;

class EditChatTitle extends Component {
  state = {
    id: this.props?.chat?.id,
    settings: this.props?.chat?.settings,
  };

  handleSettingsChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      settings: {
        ...this.state.settings,
        [name]: value,
      },
    });
  };

  render() {
    const title = this.state?.settings?.title;
    return (
      <StyledChatHeader>
        <Mutation mutation={UPDATE_CHAT_SETTINGS} variables={this.state}>
          {(updateChatSettings, { loading, error }) => (
            <div>
              <label htmlFor="title">
                <input
                  type="text"
                  id="chatTitle"
                  name="title"
                  value={title}
                  onChange={this.handleSettingsChange}
                  required
                  className="title"
                />
              </label>
              {title !== this.props?.chat?.settings?.title && (
                <div>
                  <button
                    className="secondaryBtn"
                    onClick={async () => {
                      const res = await updateChatSettings();
                    }}
                  >
                    {loading ? 'Saving' : 'Save'}
                  </button>
                </div>
              )}
            </div>
          )}
        </Mutation>
      </StyledChatHeader>
    );
  }
}

export default EditChatTitle;
