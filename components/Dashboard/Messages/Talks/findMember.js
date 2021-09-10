import React, { useState, Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { Dropdown, Icon } from 'semantic-ui-react';

const ALL_USERNAMES = gql`
  query ALL_USERNAMES {
    allUsernames {
      id
      username
      permissions
    }
  }
`;

class FindMember extends Component {
  render() {
    const { members } = this.props;
    return (
      <Query query={ALL_USERNAMES}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.allUsernames) return <h1>No usernames found</h1>;
          const usernames = data.allUsernames.map(user => ({
            key: user.username,
            text: user.username,
            value: user.id,
          }));
          return (
            <div>
              <DropdownExampleMultipleSelection
                usernames={usernames}
                members={members}
                handleSetState={this.props.handleSetState}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default FindMember;

const DropdownExampleMultipleSelection = ({
  usernames,
  collaborators,
  handleSetState,
}) => {
  const onChange = (event, data) => {
    handleSetState('members', data.value);
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
