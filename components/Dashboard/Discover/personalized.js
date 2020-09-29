import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react';
import StudiesBank from '../../Bank/Studies/index';
import TasksBank from '../../Bank/Tasks/index';
import SurveysBank from '../../Bank/Surveys/index';

import AuthorizedPage from '../../Page/userpage';

import { StyledDasboard, StyledDiscoverDasboard } from '../styles';

import ReviewStudyForParticipants from '../../Study/Landing/index';
import TaskPage from '../../Task/Run/index';

class DashboardDiscover extends Component {
  state = {
    page: this.props.page || 'bank',
    tab: this.props.tab || 'studies',
    isTaskRunning: false,
  };

  handleItemClick = (e, { name }) => this.setState({ tab: name });

  goToStudy = study => {
    this.setState({
      page: 'study',
      study,
    });
  };

  startTask = taskId => {
    if (taskId) {
      this.setState({
        taskId,
        isTaskRunning: true,
      });
    }
  };

  endTask = () => {
    this.setState({
      isTaskRunning: false,
    });
  };

  render() {
    const { page, tab } = this.state;
    const { user } = this.props;

    if (page === 'study') {
      if (this.state.isTaskRunning) {
        return (
          <TaskPage
            user={user}
            study={this.state.study}
            id={this.state.taskId}
            policy={user?.generalInfo?.data || 'science'}
            onStartTheTask={this.startTask}
            onEndTask={this.endTask}
            isExternalTaskRunning={this.state.isExternalTaskRunning}
          />
        );
      }
      return (
        <AuthorizedPage>
          <StyledDasboard>
            <div className="backButton">
              <a
                onClick={() =>
                  this.setState({
                    page: 'bank',
                  })
                }
              >
                ← Back
              </a>
            </div>
            <ReviewStudyForParticipants
              slug={this.state.study.slug}
              onStartTask={this.startTask}
              onEndTask={this.endTask}
              withoutHeader
              openedFromDashboard
            />
          </StyledDasboard>
        </AuthorizedPage>
      );
    }
    return (
      <AuthorizedPage>
        <StyledDasboard>
          <StyledDiscoverDasboard>
            <h1>Discover</h1>
            <p>
              Explore all public studies, tasks and surveys. Participate in
              studies or browse and preview tasks and surveys.
            </p>

            <div>
              <Menu text stackable className="discoverMenu">
                <Menu.Item
                  name="studies"
                  active={tab === 'studies'}
                  onClick={this.handleItemClick}
                  className={
                    tab === 'studies'
                      ? 'discoverMenuTitle selectedMenuTitle'
                      : 'discoverMenuTitle'
                  }
                >
                  <p>Studies</p>
                </Menu.Item>

                <Menu.Item
                  name="tasks"
                  active={tab === 'tasks'}
                  onClick={this.handleItemClick}
                  className={
                    tab === 'tasks'
                      ? 'discoverMenuTitle selectedMenuTitle'
                      : 'discoverMenuTitle'
                  }
                >
                  <p>Tasks</p>
                </Menu.Item>

                <Menu.Item
                  name="surveys"
                  active={tab === 'surveys'}
                  onClick={this.handleItemClick}
                  className={
                    tab === 'surveys'
                      ? 'discoverMenuTitle selectedMenuTitle'
                      : 'discoverMenuTitle'
                  }
                >
                  <p>Surveys</p>
                </Menu.Item>
              </Menu>
            </div>

            {this.state.tab === 'studies' && (
              <StudiesBank onSelectStudy={this.goToStudy} />
            )}

            {this.state.tab === 'tasks' && <TasksBank />}

            {this.state.tab === 'surveys' && <SurveysBank />}
          </StyledDiscoverDasboard>
        </StyledDasboard>
      </AuthorizedPage>
    );
  }
}

export default DashboardDiscover;
