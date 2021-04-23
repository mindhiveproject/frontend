import React, { Component } from 'react';

import StudyPage from './study';
import TaskPage from './task';

class StudyContainer extends Component {
  state = {
    page: 'study',
    taskId: null,
  };

  startTask = taskId => {
    this.setState({
      taskId,
      page: 'task',
    });
  };

  endTask = () => {
    this.setState({
      taskId: null,
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
        />
      );
    }
  }
}

export default StudyContainer;
