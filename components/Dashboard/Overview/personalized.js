import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";

import AuthorizedPage from "../../Page/userpage";
import EmptyPage from "../../Page/empty";

import OverviewStudiesBank from "../../Bank/Studies/overview";
import OverviewComponentsBank from "../../Bank/Components/overview";
import OverviewUsers from "./Users/index";
import OverviewClasses from "./Classes/index";
import OverviewTemplates from "./Templates/index";

import StudyBuilderWrapper from "../../Development/Study/builderWrapper";
import TemplateBuilderWrapper from "../../Development/Template/builderWrapper";
import ComponentBuilderWrapper from "../../Development/Component/builderWrapper";

import DevelopArea from "../../Develop/index.js";

import { StyledDasboard, StyledOverviewDasboard } from "../styles";

class DashboardOverview extends Component {
  state = {
    pagination: this.props.pagination || 1,
    page: this.props.page || "bank",
    tab: this.props.tab || "studies",
    devInfo: {},
    readOnlyMode: true,
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

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

  openStudyBuilderWithId = (studyId) => {
    this.setState({
      page: "studyBuilderNew",
      devInfo: {
        studyIdToClone: studyId,
      },
    });
  };

  openTemplateEditor = (template) => {
    this.setState({
      page: "templateBuilder",
      devInfo: {
        templateId: template.id,
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

  switchToBank = () => {
    this.setState({
      page: "bank",
    });
  };

  render() {
    const { page } = this.state;
    const { user, tab } = this.props;
    const isAdmin = user?.permissions.includes("ADMIN");

    if (page === "bank") {
      return (
        <AuthorizedPage>
          <StyledDasboard>
            <StyledOverviewDasboard>
              <h1>Overview</h1>
              {isAdmin && (
                <div className="navigationHeader">
                  <p>Admin overview of the platform MindHive.</p>
                </div>
              )}

              <div>
                <Menu text stackable className="discoverMenu">
                  {isAdmin && (
                    <Menu.Item
                      name="studies"
                      active={tab === "studies"}
                      className={
                        tab === "studies"
                          ? "discoverMenuTitle selectedMenuTitle"
                          : "discoverMenuTitle"
                      }
                    >
                      <Link href="/dashboard/overview/studies">Studies</Link>
                    </Menu.Item>
                  )}
                  {isAdmin && (
                    <Menu.Item
                      name="templates"
                      active={tab === "templates"}
                      className={
                        tab === "templates"
                          ? "discoverMenuTitle selectedMenuTitle"
                          : "discoverMenuTitle"
                      }
                    >
                      <Link href="/dashboard/overview/templates">
                        Templates
                      </Link>
                    </Menu.Item>
                  )}
                  {isAdmin && (
                    <Menu.Item
                      name="tasks"
                      active={tab === "tasks"}
                      className={
                        tab === "tasks"
                          ? "discoverMenuTitle selectedMenuTitle"
                          : "discoverMenuTitle"
                      }
                    >
                      <Link href="/dashboard/overview/tasks">Tasks</Link>
                    </Menu.Item>
                  )}
                  {isAdmin && (
                    <Menu.Item
                      name="surveys"
                      active={tab === "surveys"}
                      className={
                        tab === "surveys"
                          ? "discoverMenuTitle selectedMenuTitle"
                          : "discoverMenuTitle"
                      }
                    >
                      <Link href="/dashboard/overview/surveys">Surveys</Link>
                    </Menu.Item>
                  )}
                  {isAdmin && (
                    <Menu.Item
                      name="blocks"
                      active={tab === "blocks"}
                      className={
                        tab === "blocks"
                          ? "discoverMenuTitle selectedMenuTitle"
                          : "discoverMenuTitle"
                      }
                    >
                      <Link href="/dashboard/overview/blocks">Blocks</Link>
                    </Menu.Item>
                  )}

                  <Menu.Item
                    name="users"
                    active={tab === "users"}
                    className={
                      tab === "users"
                        ? "discoverMenuTitle selectedMenuTitle"
                        : "discoverMenuTitle"
                    }
                  >
                    <Link href="/dashboard/overview/users">Users</Link>
                  </Menu.Item>

                  <Menu.Item
                    name="classes"
                    active={tab === "classes"}
                    className={
                      tab === "classes"
                        ? "discoverMenuTitle selectedMenuTitle"
                        : "discoverMenuTitle"
                    }
                  >
                    <Link href="/dashboard/overview/classes">Classes</Link>
                  </Menu.Item>
                </Menu>
              </div>

              {tab === "studies" && (
                <OverviewStudiesBank
                  onSelectStudy={this.goToStudy}
                  openNewStudyBuilder={this.openNewStudyBuilder}
                  user={this.props.user}
                  pagination={this.props.pagination}
                  tab={this.props.tab}
                />
              )}

              {tab === "templates" && (
                <OverviewTemplates
                  user={this.props.user}
                  pagination={this.props.pagination}
                  onSelectTemplate={this.openTemplateEditor}
                  tab={this.props.tab}
                />
              )}

              {tab === "tasks" && (
                <OverviewComponentsBank
                  componentType="TASK"
                  onSelectComponent={this.openComponentEditor}
                  user={this.props.user}
                  pagination={this.props.pagination}
                />
              )}

              {tab === "surveys" && (
                <OverviewComponentsBank
                  componentType="SURVEY"
                  onSelectComponent={this.openComponentEditor}
                  user={this.props.user}
                  pagination={this.props.pagination}
                />
              )}

              {tab === "blocks" && (
                <OverviewComponentsBank
                  componentType="BLOCK"
                  onSelectComponent={this.openComponentEditor}
                  user={this.props.user}
                  pagination={this.props.pagination}
                />
              )}

              {tab === "users" && (
                <OverviewUsers
                  pagination={this.props.pagination}
                  user={this.props.user}
                />
              )}

              {tab === "classes" && (
                <OverviewClasses
                  pagination={this.props.pagination}
                  user={this.props.user}
                  openStudyBuilder={this.openStudyBuilderWithId}
                />
              )}
            </StyledOverviewDasboard>
          </StyledDasboard>
        </AuthorizedPage>
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
            adminMode
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
            adminMode
          />
        </EmptyPage>
      );
    }

    if (page === "templateBuilder") {
      return (
        <EmptyPage>
          <TemplateBuilderWrapper
            onLeave={this.switchToBank}
            templateId={this.state.devInfo.templateId}
            user={this.props.user}
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
            adminMode
          />
        </EmptyPage>
      );
    }
  }
}

export default DashboardOverview;
