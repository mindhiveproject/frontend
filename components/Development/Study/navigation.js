import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import { Icon, Menu } from "semantic-ui-react";

import { StudyBuilderNav } from "../styles";

import { TOGGLE_OPENING_MUTATION } from "../../Opening/index";

import SaveStudy from "./saveStudy";
import ArchiveDelete from "../../Bank/Studies/archiveDelete";
import Collaborators from "./collaborators";

class Navigation extends Component {
  render() {
    const { section, adminMode, user } = this.props;
    const isHidden =
      user?.studiesInfo &&
      user?.studiesInfo[this.props.study?.id]?.hideInDevelop;

    return (
      <StudyBuilderNav>
        <div className="goBackBtn" onClick={this.props.onLeave}>
          ← Leave Builder
        </div>
        <div>
          <p>{this.props.study.title}</p>
        </div>

        <Menu text stackable className="discoverMenu">
          {false && (
            <Menu.Item
              name="proposal"
              active={section === "proposal"}
              onClick={this.props.handleSectionChange}
              className={
                section === "proposal"
                  ? "discoverMenuTitle selectedMenuTitle"
                  : "discoverMenuTitle"
              }
            >
              <p>Proposal</p>
            </Menu.Item>
          )}

          <Menu.Item
            name="studyBuilder"
            active={section === "studyBuilder"}
            onClick={this.props.handleSectionChange}
            className={
              section === "studyBuilder"
                ? "discoverMenuTitle selectedMenuTitle"
                : "discoverMenuTitle"
            }
          >
            <p>Study Builder</p>
          </Menu.Item>

          {false && (
            <>
              <Menu.Item
                name="review"
                active={section === "review"}
                onClick={this.props.handleSectionChange}
                className={
                  section === "review"
                    ? "discoverMenuTitle selectedMenuTitle"
                    : "discoverMenuTitle"
                }
              >
                <p>Reviews</p>
              </Menu.Item>

              <Menu.Item
                name="collect"
                active={section === "collect"}
                onClick={this.props.handleSectionChange}
                className={
                  section === "collect"
                    ? "discoverMenuTitle selectedMenuTitle"
                    : "discoverMenuTitle"
                }
              >
                <p>Collect</p>
              </Menu.Item>

              <Menu.Item
                name="download"
                active={section === "download"}
                onClick={this.props.handleSectionChange}
                className={
                  section === "download"
                    ? "discoverMenuTitle selectedMenuTitle"
                    : "discoverMenuTitle"
                }
              >
                <p>Download</p>
              </Menu.Item>

              <Menu.Item
                name="analyze"
                active={section === "analyze"}
                onClick={this.props.handleSectionChange}
                className={
                  section === "analyze"
                    ? "discoverMenuTitle selectedMenuTitle"
                    : "discoverMenuTitle"
                }
              >
                <p>Analyze</p>
              </Menu.Item>
            </>
          )}
        </Menu>

        <div>
          <Mutation mutation={TOGGLE_OPENING_MUTATION}>
            {(toggleOpening) => (
              <button onClick={toggleOpening}>
                <Icon name="rocketchat" size="large" />
              </button>
            )}
          </Mutation>
        </div>

        <div className="rightButtons">
          <Collaborators
            openSharingModal={this.props.openSharingModal}
            study={this.props.study}
          />

          <ArchiveDelete study={this.props.study} isHidden={isHidden} />

          <SaveStudy
            study={this.props.study}
            isAuthor={this.props.isAuthor}
            adminMode={this.props.adminMode}
            needToClone={this.props.needToClone}
            newStudyFromScratch={this.props.newStudyFromScratch}
            proposalId={this.props.proposalId}
            createNewStudy={this.props.createNewStudy}
            updateMyStudy={this.props.updateMyStudy}
          />
        </div>
      </StudyBuilderNav>
    );
  }
}

export default Navigation;
