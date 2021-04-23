import React, { useState, Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { Dropdown, Icon } from 'semantic-ui-react';

const ALL_CLASSES_NAMES = gql`
  query ALL_CLASSES_NAMES {
    classes {
      id
      title
    }
  }
`;

class FindClass extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={ALL_CLASSES_NAMES}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.classes) return <h1>No classes found</h1>;
          const classesNames = data.classes.map(theclass => ({
            key: theclass.id,
            text: theclass.title,
            value: theclass.id,
          }));
          return (
            <DropdownExampleMultipleSelection
              names={classesNames}
              classes={classes}
              handleClassesChange={this.props.handleClassesChange}
            />
          );
        }}
      </Query>
    );
  }
}

export default FindClass;

const DropdownExampleMultipleSelection = ({
  names,
  classes,
  handleClassesChange,
}) => {
  const onChange = (event, data) => {
    handleClassesChange(data.value);
  };

  return (
    <Dropdown
      placeholder="Type class name"
      fluid
      multiple
      search
      selection
      options={names}
      onChange={onChange}
      value={classes}
    />
  );
};
