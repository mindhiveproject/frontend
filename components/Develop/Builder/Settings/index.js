import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

import ComponentSelector from "../Selector/index";
import StudyFlow from "./studyFlow";
import StudySettings from "./studySettings";

import { StyledSettings } from "./styles";

export default class Settings extends Component {
  state = {
    tab: this.props.tab || "addBlock",
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  render() {
    const { tab } = this.state;
    return (
      <StyledSettings>
        <Menu text stackable className="menu">
          <Menu.Item
            name="addBlock"
            active={tab === "addBlock"}
            onClick={this.handleItemClick}
            className={
              tab === "addBlock" ? "menuTitle selectedMenuTitle" : "menuTitle"
            }
          >
            <h2>Add a block</h2>
          </Menu.Item>

          <Menu.Item
            name="flow"
            active={tab === "flow"}
            onClick={this.handleItemClick}
            className={
              tab === "flow" ? "menuTitle selectedMenuTitle" : "menuTitle"
            }
          >
            <h2>Study flow</h2>
          </Menu.Item>

          <Menu.Item
            name="settings"
            active={tab === "settings"}
            onClick={this.handleItemClick}
            className={
              tab === "settings" ? "menuTitle selectedMenuTitle" : "menuTitle"
            }
          >
            <h2>Study settings</h2>
          </Menu.Item>
        </Menu>

        {tab === "addBlock" && <ComponentSelector {...this.props} />}

        {tab === "flow" && <StudyFlow {...this.props} />}

        {tab === "settings" && <StudySettings {...this.props} />}
      </StyledSettings>
    );
  }
}
