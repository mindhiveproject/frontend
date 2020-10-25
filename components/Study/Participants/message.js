import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const CREATE_MESSAGE = gql`
  mutation CREATE_MESSAGE(
    $content: String
    $info: Json
    $settings: Json
    $expireAt: DateTime
  ) {
    createMessage(
      content: $content
      info: $info
      settings: $settings
      expireAt: $expireAt
    ) {
      id
    }
  }
`;

class MessageSender extends Component {
  state = {
    settings: {
      origin: {
        type: this.props.type,
        id: this.props.id,
      },
    },
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_MESSAGE} variables={this.state}>
        {(createMessage, { loading, error }) => (
          <div>
            <h1>This functionality is currently in development</h1>
            <h2>Create an update for participants of this study</h2>

            <label htmlFor="content">
              Message
              <textarea
                id="content"
                name="content"
                placeholder="Your message"
                value={this.state.content}
                onChange={this.handleChange}
              />
            </label>

            <button
              onClick={() => {
                createMessage();
              }}
            >
              Send{loading ? 'ing' : ''}
            </button>
          </div>
        )}
      </Mutation>
    );
  }
}

export default MessageSender;
