import React, { Component } from "react";

import { Menu } from "semantic-ui-react";
import DevelopedStudiesBank from "../../Bank/Studies/developed";
import DevelopedComponentsBank from "../../Bank/Components/developed";

import AuthorizedPage from "../../Page/userpage";
import EmptyPage from "../../Page/empty";

import DevelopmentSelectScreen from "../../Development/selectScreen";
import StudyBuilderWrapper from "../../Development/Study/builderWrapper";
import ComponentBuilderWrapper from "../../Development/Component/builderWrapper";
import { StyledDasboard, StyledDevelopDasboard } from "../styles";

import DevelopArea from "../../Develop/index.js";

class DashboardDevelop extends Component {
  state = {
    page: this.props.page || "bank",
    tab: this.props.tab || "studies",
    devInfo: {},
    showAllStudies: false,
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  // todo change later to old study builder
  goToStudy = (study) => {
    this.setState({
      page: "studyBuilder",
      devInfo: {
        studyIdToClone: study.id,
      },
    });
  };

  openNewStudyBuilder = (study) => {
    this.setState({
      page: "studyBuilderNew",
      devInfo: {
        studyIdToClone: study.id,
      },
    });
  };

  openComponentEditor = (component) => {
    this.setState({
      page: "componentBuilder",
      devInfo: {
        componentId: component.id,
      },
    });
  };

  developNew = () => {
    this.setState({
      page: "develop",
      devInfo: {
        stage: null,
        choice: null,
        action: null,
        studyIdToClone: null,
      },
    });
  };

  switchToBank = () => {
    this.setState({
      page: "bank",
    });
  };

  render() {
    const { page, tab } = this.state;
    const { user } = this.props;

    if (!user) {
      return <div>Please log in</div>;
    }

    const myStudies = [...user?.researcherIn, ...user?.collaboratorInStudy]
      .filter((study) => !study.isHidden)
      .map((study) => study?.id);
    const numberOfStudies = [...new Set(myStudies)]?.length;
    const numberOfTasks =
      user?.taskCreatorIn.filter((task) => task.taskType === "TASK").length +
      user?.collaboratorInTask.filter((task) => task.taskType === "TASK")
        .length;
    const numberOfSurveys =
      user?.taskCreatorIn.filter((task) => task.taskType === "SURVEY").length +
      user?.collaboratorInTask.filter((task) => task.taskType === "SURVEY")
        .length;
    const numberOfBlocks =
      user?.taskCreatorIn.filter((task) => task.taskType === "BLOCK").length +
      user?.collaboratorInTask.filter((task) => task.taskType === "BLOCK")
        .length;

    if (page === "bank") {
      return (
        <AuthorizedPage>
          <StyledDasboard>
            <StyledDevelopDasboard>
              <h1>Develop</h1>
              <div className="navigationHeader">
                <div>
                  <p>
                    All studies, tasks or surveys you have{" "}
                    <strong>developed or are collaborating on</strong>.
                  </p>
                </div>
                <div>
                  <button onClick={this.developNew}>Develop new</button>
                </div>
              </div>

              <div>
                <Menu text stackable className="discoverMenu">
                  <Menu.Item
                    name="studies"
                    active={tab === "studies"}
                    onClick={this.handleItemClick}
                    className={
                      tab === "studies"
                        ? "discoverMenuTitle selectedMenuTitle"
                        : "discoverMenuTitle"
                    }
                  >
                    <p>My studies ({numberOfStudies || 0})</p>
                  </Menu.Item>

                  <Menu.Item
                    name="tasks"
                    active={tab === "tasks"}
                    onClick={this.handleItemClick}
                    className={
                      tab === "tasks"
                        ? "discoverMenuTitle selectedMenuTitle"
                        : "discoverMenuTitle"
                    }
                  >
                    <p>My tasks ({numberOfTasks || 0})</p>
                  </Menu.Item>

                  <Menu.Item
                    name="surveys"
                    active={tab === "surveys"}
                    onClick={this.handleItemClick}
                    className={
                      tab === "surveys"
                        ? "discoverMenuTitle selectedMenuTitle"
                        : "discoverMenuTitle"
                    }
                  >
                    <p>My surveys ({numberOfSurveys || 0})</p>
                  </Menu.Item>

                  <Menu.Item
                    name="blocks"
                    active={tab === "blocks"}
                    onClick={this.handleItemClick}
                    className={
                      tab === "blocks"
                        ? "discoverMenuTitle selectedMenuTitle"
                        : "discoverMenuTitle"
                    }
                  >
                    <p>My blocks ({numberOfBlocks || 0})</p>
                  </Menu.Item>
                </Menu>
              </div>

              {this.state.tab === "studies" && (
                <div>
                  <DevelopedStudiesBank
                    onSelectStudy={this.goToStudy}
                    openNewStudyBuilder={this.openNewStudyBuilder}
                    user={this.props.user}
                    showAllStudies={this.state.showAllStudies}
                  />
                </div>
              )}

              {this.state.tab === "tasks" && (
                <DevelopedComponentsBank
                  componentType="TASK"
                  onSelectComponent={this.openComponentEditor}
                  user={this.props.user}
                />
              )}

              {this.state.tab === "surveys" && (
                <DevelopedComponentsBank
                  componentType="SURVEY"
                  onSelectComponent={this.openComponentEditor}
                  user={this.props.user}
                />
              )}

              {this.state.tab === "blocks" && (
                <DevelopedComponentsBank
                  componentType="BLOCK"
                  onSelectComponent={this.openComponentEditor}
                  user={this.props.user}
                />
              )}
            </StyledDevelopDasboard>
          </StyledDasboard>
        </AuthorizedPage>
      );
    }
    if (page === "develop") {
      return (
        <EmptyPage>
          <DevelopmentSelectScreen
            onClose={this.switchToBank}
            user={this.props.user}
            devInfo={this.state.devInfo}
          />
        </EmptyPage>
      );
    }

    if (page === "studyBuilder") {
      return (
        <EmptyPage>
          <StudyBuilderWrapper
            onLeave={this.switchToBank}
            studyId={this.state.devInfo.studyIdToClone}
            user={this.props.user}
            needToClone={false}
          />
        </EmptyPage>
      );
    }

    if (page === "studyBuilderNew") {
      return (
        <EmptyPage>
          <DevelopArea
            user={this.props.user}
            studyId={this.state.devInfo.studyIdToClone}
            onLeave={this.switchToBank}
            needToClone={false}
          />
        </EmptyPage>
      );
    }

    if (page === "componentBuilder") {
      return (
        <EmptyPage>
          <ComponentBuilderWrapper
            onLeave={this.switchToBank}
            componentId={this.state.devInfo.componentId}
            user={this.props.user}
            needToClone={false}
          />
        </EmptyPage>
      );
    }
  }
}

export default DashboardDevelop;
