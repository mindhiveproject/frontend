import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { MY_PARAMETERS_QUERY } from './my';

const UPDATE_SETTINGS_MUTATION = gql`
  mutation UPDATE_SETTINGS_MUTATION($id: ID!, $settings: Json) {
    updateParameter(id: $id, settings: $settings) {
      id
      title
      settings
    }
  }
`;

class UpdateSettings extends Component {
  state = {
    id: this.props.id,
    settings: this.props.settings,
  };

  render() {
    const status =
      this.props.settings && this.props.settings.status === 'public'
        ? 'private'
        : 'public';
    return (
      <Mutation
        mutation={UPDATE_SETTINGS_MUTATION}
        variables={{
          id: this.props.id,
          settings: { ...this.props.settings, status },
        }}
        refetchQueries={[{ query: MY_PARAMETERS_QUERY }]}
      >
        {(updateParameter, { error }) => (
          <button
            type="button"
            onClick={() => {
              this.setState({
                settings: {
                  ...this.state.settings,
                  status,
                },
              });
              updateParameter().catch(err => {
                alert(err.message);
              });
            }}
          >
            <h2>
              {this.state.settings &&
              this.state.settings.status &&
              this.state.settings.status === 'public'
                ? 'Make private'
                : 'Publish'}
            </h2>
          </button>
        )}
      </Mutation>
    );
  }
}

export default UpdateSettings;
