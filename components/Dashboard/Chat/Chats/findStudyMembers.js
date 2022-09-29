import React, { useState, Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { Dropdown } from 'semantic-ui-react';

const MY_STUDIES = gql`
  query MY_STUDIES {
    myStudies {
      id
      title
      author {
        id
      }
      collaborators {
        id
      }
    }
  }
`;

class FindStudyMembers extends Component {
  render() {
    const { studies } = this.props;
    return (
      <Query query={MY_STUDIES}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.myStudies) return <h1>No studies found</h1>;

          const classOptions = data.myStudies.map(myStudy => {
            const members = myStudy.collaborators.map(student => student.id);
            return {
              key: myStudy.id,
              text: myStudy.title,
              value: myStudy.id,
              members,
            };
          });
          return (
            <div>
              <DropdownExampleMultipleSelection
                classOptions={classOptions}
                studies={studies}
                handleSetState={this.props.handleStudyChange}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default FindStudyMembers;

const DropdownExampleMultipleSelection = ({
  classOptions,
  studies,
  handleSetState,
}) => {
  const onChange = (event, data) => {
    handleSetState('studies', data.value);
  };

  return (
    <Dropdown
      placeholder="Type study name"
      fluid
      multiple
      search
      selection
      options={classOptions}
      onChange={onChange}
      value={studies}
    />
  );
};
