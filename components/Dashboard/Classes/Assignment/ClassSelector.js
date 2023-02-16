import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { Query } from "@apollo/client/react/components";

import { MY_CLASSES_QUERY } from "../classes";

class ClassSelector extends Component {
  render() {
    const { classId, handleClassChange } = this.props;

    return (
      <Query query={MY_CLASSES_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading ... </p>;

          const myClasses = data?.myClasses.map((myClass) => ({
            key: myClass.id,
            text: myClass.title,
            value: myClass.id,
          }));

          return (
            <div className="consentSelector">
              <p>Class(es)</p>
              <DropdownExampleMultipleSelection
                classes={myClasses}
                assignmentClasses={classId}
                handleClassChange={handleClassChange}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ClassSelector;

const DropdownExampleMultipleSelection = ({
  classes,
  assignmentClasses,
  handleClassChange,
}) => {
  const onChange = (event, data) => {
    handleClassChange({ classId: data.value });
  };

  return (
    <Dropdown
      placeholder="Type class name"
      fluid
      multiple
      search
      selection
      options={classes}
      onChange={onChange}
      value={assignmentClasses}
    />
  );
};
