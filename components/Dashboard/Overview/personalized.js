import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import Link from 'next/link';

import AuthorizedPage from '../../Page/userpage';
import EmptyPage from '../../Page/empty';

import OverviewStudiesBank from '../../Bank/Studies/overview';
import OverviewComponentsBank from '../../Bank/Components/overview';
import OverviewUsers from './Users/index';
import OverviewClasses from './Classes/index';

import StudyBuilderWrapper from '../../Development/Study/builderWrapper';
import ComponentBuilderWrapper from '../../Development/Component/builderWrapper';

import { StyledDasboard, StyledDevelopDasboard } from '../styles';

class DashboardOverview extends Component {
  state = {
    pagination: this.props.pagination || 1,
    page: this.props.page || 'bank',
    tab: this.props.tab || 'studies',
    devInfo: {},
    readOnlyMode: true,
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  goToStudy = study => {
    this.setState({
      page: 'studyBuilder',
      devInfo: {
        studyIdToClone: study.id,
      },
    });
  };

  openComponentEditor = component => {
    this.setState({
      page: 'componentBuilder',
      devInfo: {
        componentId: component.id,
      },
    });
  };

  switchToBank = () => {
    this.setState({
      page: 'bank',
    });
  };

  render() {
    const { page } = this.state;
    const { user, tab } = this.props;

    if (page === 'bank') {
      return (
        <AuthorizedPage>
          <StyledDasboard>
            <StyledDevelopDasboard>
              <h1>Overview</h1>
              <div className="navigationHeader">
                <div>
                  <p>Admin overview of the platform MindHive.</p>
                </div>
              </div>

              <div>
                <Menu text stackable className="discoverMenu">
                  <Menu.Item
                    name="studies"
                    active={tab === 'studies'}
                    className={
                      tab === 'studies'
                        ? 'discoverMenuTitle selectedMenuTitle'
                        : 'discoverMenuTitle'
                    }
                  >
                    <Link href="/dashboard/overview/studies">
                      <p>All studies</p>
                    </Link>
                  </Menu.Item>

                  <Menu.Item
                    name="tasks"
                    active={tab === 'tasks'}
                    className={
                      tab === 'tasks'
                        ? 'discoverMenuTitle selectedMenuTitle'
                        : 'discoverMenuTitle'
                    }
                  >
                    <Link href="/dashboard/overview/tasks">
                      <p>All tasks</p>
                    </Link>
                  </Menu.Item>

                  <Menu.Item
                    name="surveys"
                    active={tab === 'surveys'}
                    className={
                      tab === 'surveys'
                        ? 'discoverMenuTitle selectedMenuTitle'
                        : 'discoverMenuTitle'
                    }
                  >
                    <Link href="/dashboard/overview/surveys">
                      <p>All surveys</p>
                    </Link>
                  </Menu.Item>

                  <Menu.Item
                    name="blocks"
                    active={tab === 'blocks'}
                    className={
                      tab === 'blocks'
                        ? 'discoverMenuTitle selectedMenuTitle'
                        : 'discoverMenuTitle'
                    }
                  >
                    <Link href="/dashboard/overview/blocks">
                      <p>All blocks</p>
                    </Link>
                  </Menu.Item>

                  <Menu.Item
                    name="users"
                    active={tab === 'users'}
                    className={
                      tab === 'users'
                        ? 'discoverMenuTitle selectedMenuTitle'
                        : 'discoverMenuTitle'
                    }
                  >
                    <Link href="/dashboard/overview/users">
                      <p>All users</p>
                    </Link>
                  </Menu.Item>

                  <Menu.Item
                    name="classes"
                    active={tab === 'classes'}
                    className={
                      tab === 'classes'
                        ? 'discoverMenuTitle selectedMenuTitle'
                        : 'discoverMenuTitle'
                    }
                  >
                    <Link href="/dashboard/overview/classes">
                      <p>All classes</p>
                    </Link>
                  </Menu.Item>
                </Menu>
              </div>

              {tab === 'studies' && (
                <OverviewStudiesBank
                  onSelectStudy={this.goToStudy}
                  user={this.props.user}
                  pagination={this.props.pagination}
                  tab={this.props.tab}
                />
              )}

              {tab === 'users' && <OverviewUsers />}

              {tab === 'tasks' && (
                <OverviewComponentsBank
                  componentType="TASK"
                  onSelectComponent={this.openComponentEditor}
                  user={this.props.user}
                />
              )}

              {tab === 'surveys' && (
                <OverviewComponentsBank
                  componentType="SURVEY"
                  onSelectComponent={this.openComponentEditor}
                  user={this.props.user}
                />
              )}

              {tab === 'blocks' && (
                <OverviewComponentsBank
                  componentType="BLOCK"
                  onSelectComponent={this.openComponentEditor}
                  user={this.props.user}
                />
              )}

              {tab === 'classes' && <OverviewClasses />}
            </StyledDevelopDasboard>
          </StyledDasboard>
        </AuthorizedPage>
      );
    }

    if (page === 'studyBuilder') {
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
    if (page === 'componentBuilder') {
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
