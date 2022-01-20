import React, { Component } from 'react';

import AuthorizedPage from '../../Page/userpage';

import { StyledDasboard } from '../styles';

import ReviewStudyForParticipants from '../../Study/Landing/index';
import TaskParticipantPage from '../../Task/PublicPage/index';
import TaskPage from '../../Task/Run/index';

import Main from './main';

class DashboardDiscover extends Component {
  state = {
    page: this.props.page || 'bank',
    isTaskRunning: false,
  };

  goToStudy = study => {
    this.setState({
      page: 'study',
      study,
      tab: 'studies',
    });
  };

  goToTask = task => {
    this.setState({
      page: 'task',
      task,
      tab: 'components',
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
    if (page === 'task') {
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
            <TaskParticipantPage slug={this.state.task.slug} user={user} />
          </StyledDasboard>
        </AuthorizedPage>
      );
    }
    return (
      <AuthorizedPage>
        <Main
          user={user}
          tab={this.state.tab || 'studies'}
          goToStudy={this.goToStudy}
          goToTask={this.goToTask}
        />
      </AuthorizedPage>
    );
  }
}

export default DashboardDiscover;
