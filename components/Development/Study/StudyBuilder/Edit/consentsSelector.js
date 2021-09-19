import React, { useState, Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { Dropdown, Icon } from 'semantic-ui-react';

class ConsentsSelector extends Component {
  render() {
    const { study, handleSetState } = this.props;
    console.log('study', study);

    const consents = this.props.consents.map(consent => ({
      key: consent.id,
      text: consent.title,
      value: consent.id,
    }));

    return (
      <DropdownExampleMultipleSelection
        consents={consents}
        studyConsents={study?.consent}
        handleSetState={handleSetState}
      />
    );
  }
}

export default ConsentsSelector;

const DropdownExampleMultipleSelection = ({
  consents,
  studyConsents,
  handleSetState,
}) => {
  const onChange = (event, data) => {
    handleSetState('consent', data.value);
  };
  console.log('consents', consents);

  return (
    <Dropdown
      placeholder="Type consent name"
      fluid
      multiple
      search
      selection
      options={consents}
      onChange={onChange}
      value={studyConsents}
    />
  );
};
