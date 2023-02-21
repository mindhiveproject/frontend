import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { Dropdown } from "semantic-ui-react";

import { ALL_PUBLIC_USERNAMES } from "../../Queries/Profile";

class FindAuthor extends Component {
  render() {
    const { username, setUsername } = this.props;
    const currentAuthor = [username] || [];
    return (
      <Query
        query={ALL_PUBLIC_USERNAMES}
        variables={{ usernames: currentAuthor }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.allPublicUsernames)
            return <h1>No usernames found</h1>;

          const usernames = data.allPublicUsernames.map((user) => ({
            key: user.username,
            text: user.username,
            value: user.username,
          }));
          return (
            <div>
              <h2>Select the study author</h2>
              <DropdownExampleMultipleSelection
                usernames={usernames}
                author={username}
                handleSetState={setUsername}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default FindAuthor;

const DropdownExampleMultipleSelection = ({
  usernames,
  author,
  handleSetState,
}) => {
  const onChange = (event, data) => {
    handleSetState(data.value);
  };

  return (
    <Dropdown
      placeholder="Type username"
      search
      selection
      options={usernames}
      onChange={onChange}
      value={author}
    />
  );
};
