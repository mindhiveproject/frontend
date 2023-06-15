import React, { Component } from "react";

import SettingsBlock from "./settingBlock";

class Parameters extends Component {
  render() {
    const { study, user } = this.props;

    const hasIRBAccess =
      user &&
      user?.permissions &&
      (user.permissions.includes("TEACHER") ||
        user.permissions.includes("SCIENTIST") ||
        user.permissions.includes("ADMIN"));

    const settings = {
      forbidRetake: true,
      hideParticipateButton: false,
      showEmailNotificationPropmt: false,
      askStudentsNYC: false,
      ...study.settings,
    };

    // settings that are shown only to students
    const settingsOnlyStudents = [
      "hideParticipateButton",
      "guestParticipation",
      "consentObtained",
      "zipCode",
      "proceedToFirstTask",
      "forbidRetake",
    ];

    // scales that should be reversed because of the naming and description
    const reverseScales = ["hideParticipateButton", "forbidRetake"];

    return (
      <div>
        <h2>Participation settings</h2>

        <div>
          {Object.keys(settings)
            .filter((name) => settingsOnlyStudents.includes(name))
            .map((name, i) => (
              <SettingsBlock
                key={i}
                name={name}
                value={study.settings[name]}
                handleSettingsChange={this.props.handleSettingsChange}
                isReverse={reverseScales.includes(name)}
                study={study}
                hasIRBAccess={hasIRBAccess}
                updateStudyState={this.props.updateStudyState}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Parameters;
