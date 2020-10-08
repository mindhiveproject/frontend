import React, { useState, Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Dropdown } from 'semantic-ui-react';

const ALL_USERNAMES = gql`
  query ALL_USERNAMES {
    allUsernames {
      username
    }
  }
`;

class FindCollaborator extends Component {
  render() {
    const { study } = this.props;
    return (
      <Query query={ALL_USERNAMES}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.allUsernames) return <h1>No usernames found</h1>;
          const usernames = data.allUsernames.map(user => ({
            key: user.username,
            text: user.username,
            value: user.username,
          }));
          return (
            <div>
              <label>Add a collaborator</label>
              <DropdownExampleMultipleSelection
                usernames={usernames}
                collaborators={study.collaborators}
                handleSetState={this.props.handleSetState}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default FindCollaborator;

const DropdownExampleMultipleSelection = ({
  usernames,
  collaborators,
  handleSetState,
}) => {
  const onChange = (event, data) => {
    handleSetState('collaborators', data.value);
  };

  return (
    <Dropdown
      placeholder="Type username"
      fluid
      multiple
      search
      selection
      options={usernames}
      onChange={onChange}
      value={collaborators}
    />
  );
};
