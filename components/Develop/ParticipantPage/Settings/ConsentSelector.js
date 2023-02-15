import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { Query } from "@apollo/client/react/components";

import { CONSENTS_QUERY } from "../../../Task/Customize/taskForm";

class ConsentSelector extends Component {
  render() {
    const { study, updateStudyState } = this.props;

    return (
      <Query query={CONSENTS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading ... </p>;

          const consents = data?.consents.map((consent) => ({
            key: consent.id,
            text: consent.title,
            value: consent.id,
          }));

          return (
            <div className="consentSelector">
              <p>IRB consent(s)</p>
              <DropdownExampleMultipleSelection
                consents={consents}
                studyConsents={study?.consentId}
                updateStudyState={updateStudyState}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ConsentSelector;

const DropdownExampleMultipleSelection = ({
  consents,
  studyConsents,
  updateStudyState,
}) => {
  const onChange = (event, data) => {
    updateStudyState("consentId", data.value);
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
