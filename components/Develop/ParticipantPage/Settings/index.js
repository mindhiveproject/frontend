import React, { Component } from "react";

import { StyledSettings } from "../styles";

import ShareStudy from "./share";
import Parameters from "./parameters";

class Settings extends Component {
  render() {
    return (
      <StyledSettings>
        <ShareStudy {...this.props} />
        <Parameters {...this.props} />
      </StyledSettings>
    );
  }
}

export default Settings;
