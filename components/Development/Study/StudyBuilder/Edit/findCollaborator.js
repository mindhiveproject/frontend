import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { Dropdown } from 'semantic-ui-react';

const ALL_PUBLIC_USERNAMES = gql`
  query ALL_PUBLIC_USERNAMES {
    allPublicUsernames {
      username
      permissions
    }
  }
`;

class FindCollaborator extends Component {
  render() {
    const { study } = this.props;
    return (
      <Query query={ALL_PUBLIC_USERNAMES}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.allPublicUsernames)
            return <h1>No usernames found</h1>;
          const usernames = data.allPublicUsernames.map(user => ({
            key: user.username,
            text: user.username,
            value: user.username,
          }));
          return (
            <div>
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
