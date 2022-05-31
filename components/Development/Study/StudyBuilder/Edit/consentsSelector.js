import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

class ConsentsSelector extends Component {
  render() {
    const { study, handleSetState } = this.props;
    const consents = this.props.consents.map(consent => ({
      key: consent.id,
      text: consent.title,
      value: consent.id,
    }));

    return (
      <DropdownExampleMultipleSelection
        consents={consents}
        studyConsents={study?.consentId}
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
    handleSetState('consentId', data.value);
  };

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
