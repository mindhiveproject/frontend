import React, { Component } from 'react';

import AuthorizedPage from '../../Page/userpage';

import { StyledDasboard } from '../styles';

import ReviewStudyForParticipants from '../../Study/Landing/index';
import TaskPage from '../../Task/Run/index';

import Main from './main';

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
        <Main
          user={user}
          tab={tab}
          handleItemClick={this.handleItemClick}
          goToStudy={this.goToStudy}
        />
      </AuthorizedPage>
    );
  }
}

export default DashboardDiscover;
