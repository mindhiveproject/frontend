import React, { Component } from 'react';

import Page from '../../Page/index';
import StudyPage from './page';
import TaskPage from '../../Task/Run/index';

class StudyUserPage extends Component {
  state = {
    isTaskRunning: false,
    isExternalTaskRunning: false,
    taskId: '',
  };

  startTheTask = taskId => {
    if (taskId) {
      if (this.props.openedFromDashboard && this.props.onStartTask) {
        this.props.onStartTask(taskId);
      } else {
        this.setState({
          taskId,
          isTaskRunning: true,
        });
      }
    }
  };

  startExternalTask = taskId => {
    if (taskId) {
      if (this.props.openedFromDashboard && this.props.onStartTask) {
        this.props.onStartTask(taskId);
      } else {
        this.setState({
          taskId,
          isTaskRunning: true,
          isExternalTaskRunning: true,
        });
      }
    }
  };

  endTask = () => {
    if (this.props.openedFromDashboard && this.props.onEndTask) {
      this.props.onEndTask();
    } else {
      this.setState({
        isTaskRunning: false,
      });
    }
  };

  render() {
    const { study, user } = this.props;
    if (this.state.isTaskRunning) {
      return (
        <TaskPage
          user={user}
          study={study}
          id={this.state.taskId}
          policy={user?.generalInfo?.data || 'science'}
          onStartTheTask={this.startTheTask}
          onEndTask={this.endTask}
          isExternalTaskRunning={this.state.isExternalTaskRunning}
        />
      );
    }
    if (this.props.withoutHeader) {
      return (
        <StudyPage
          study={study}
          user={user}
          onStartTheTask={this.startTheTask}
          onStartExternalTask={this.startExternalTask}
        />
      );
    }
    return (
      <Page>
        <StudyPage
          study={study}
          user={user}
          onStartTheTask={this.startTheTask}
          onStartExternalTask={this.startExternalTask}
        />
      </Page>
    );
  }
}

export default StudyUserPage;
