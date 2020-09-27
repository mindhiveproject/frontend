import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react';
import ParticipatedStudiesBank from '../../Bank/Studies/participated';
import ParticipatedTasksBank from '../../Bank/Tasks/participated';
import ParticipatedSurveysBank from '../../Bank/Surveys/participated';

import AuthorizedPage from '../../Page/userpage';

import { StyledDasboard, StyledDiscoverDasboard } from '../styles';

import ReviewStudyForParticipants from '../../Study/Landing/index';
import TaskPage from '../../Task/Run/index';

class DashboardParticipate extends Component {
  state = {
    page: this.props.page || 'bank',
    tab: this.props.tab || 'studies',
    isTaskRunning: false,
    stats: this.props.stats,
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
            <a
              onClick={() =>
                this.setState({
                  page: 'bank',
                })
              }
            >
              ← Back
            </a>
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
            <h1>Participate</h1>
            <p>
              All studies, tasks or surveys you have{' '}
              <strong>participated in</strong>.
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
                  <p>
                    Studies (
                    {this.state.stats.studies ? this.state.stats.studies : 0})
                  </p>
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
                  <p>
                    Tasks ({this.state.stats.tasks ? this.state.stats.tasks : 0}
                    )
                  </p>
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
                  <p>
                    Surveys (
                    {this.state.stats.surveys ? this.state.stats.surveys : 0})
                  </p>
                </Menu.Item>
              </Menu>
            </div>

            {this.state.tab === 'studies' && (
              <ParticipatedStudiesBank
                onSelectStudy={this.goToStudy}
                user={this.props.user}
              />
            )}

            {this.state.tab === 'tasks' && (
              <ParticipatedTasksBank user={this.props.user} />
            )}

            {this.state.tab === 'surveys' && (
              <ParticipatedSurveysBank user={this.props.user} />
            )}
          </StyledDiscoverDasboard>
        </StyledDasboard>
      </AuthorizedPage>
    );
  }
}

export default DashboardParticipate;
