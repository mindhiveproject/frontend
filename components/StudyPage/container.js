import React, { Component } from 'react';

import StudyPage from './study';
import TaskPage from './task';

class StudyContainer extends Component {
  state = {
    page: 'study',
    taskId: null,
    version: null,
  };

  startTask = (taskId, version) => {
    this.setState({
      taskId,
      version,
      page: 'task',
    });
  };

  endTask = () => {
    this.setState({
      taskId: null,
      version: null,
      page: 'study',
    });
  };

  render() {
    const { study, user } = this.props;

    if (this.state.page === 'study') {
      return (
        <StudyPage user={user} study={study} onStartTask={this.startTask} />
      );
    }
    if (this.state.page === 'task') {
      return (
        <TaskPage
          user={user}
          study={study}
          id={this.state.taskId}
          onEndTask={this.endTask}
          policy="review"
          version={this.state.version}
        />
      );
    }
  }
}

export default StudyContainer;
