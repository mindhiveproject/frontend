import React, { useState, Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { Dropdown } from 'semantic-ui-react';

const MY_CLASSES = gql`
  query MY_CLASSES {
    myStudentTeacherClasses {
      id
      title
      students {
        id
      }
    }
  }
`;

class FindClassMembers extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={MY_CLASSES}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.myStudentTeacherClasses)
            return <h1>No classes found</h1>;

          const classOptions = data.myStudentTeacherClasses.map(myClass => ({
            key: myClass.id,
            text: myClass.title,
            value: myClass.id,
            members: myClass.students.map(student => student.id),
          }));
          return (
            <div>
              <DropdownExampleMultipleSelection
                classOptions={classOptions}
                classes={classes}
                handleSetState={this.props.handleClassChange}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default FindClassMembers;

const DropdownExampleMultipleSelection = ({
  classOptions,
  classes,
  handleSetState,
}) => {
  const onChange = (event, data) => {
    handleSetState('classes', data.value);
  };

  return (
    <Dropdown
      placeholder="Type class name"
      fluid
      multiple
      search
      selection
      options={classOptions}
      onChange={onChange}
      value={classes}
    />
  );
};
