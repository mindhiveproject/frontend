import React, { Component } from 'react';

import { Dropdown } from 'semantic-ui-react';

class LinkClass extends Component {
  render() {
    const { study, user } = this.props;

    const myClassObjects =
      [...user?.studentIn, ...user?.teacherIn, ...user?.mentorIn] || [];
    const myClasses = myClassObjects.map(cl => ({
      key: cl.id,
      text: cl.title,
      value: cl.id,
    }));
    const myClassesIncludingEmpty = [
      {
        key: 0,
        text: '❌  Do not connect the class',
        value: '$$$-class-not-connected-$$$',
      },
      ...myClasses,
    ];

    const selectedClass = study?.classes?.length && study?.classes[0];
    const selectedClassIncludingEmpty =
      selectedClass || '$$$-class-not-connected-$$$';

    return (
      <DropdownExampleMultipleSelection
        myClasses={myClassesIncludingEmpty}
        selectedClass={selectedClassIncludingEmpty}
        handleSetState={this.props.handleSetState}
      />
    );
  }
}

export default LinkClass;

const DropdownExampleMultipleSelection = ({
  myClasses,
  selectedClass,
  handleSetState,
}) => {
  const onChange = (event, data) => {
    handleSetState(
      'classes',
      data.value === '$$$-class-not-connected-$$$' ? null : [data.value]
    );
  };

  return (
    <Dropdown
      placeholder=""
      fluid
      search
      selection
      options={myClasses}
      onChange={onChange}
      value={selectedClass}
    />
  );
};
