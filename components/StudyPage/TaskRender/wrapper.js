import React, { Component } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { StyledBox } from './styles';

import Task from './task';
import Post from './post';

class RunExperiment extends Component {
  state = {
    page: 'task',
    token: '',
  };

  setToken = token => {
    this.setState({
      token,
      page: 'post',
    });
  };

  closePrompt = () => {
    this.setState({
      page: 'task',
      token: null,
    });
    this.props.onEndTask();
  };

  render() {
    const { user, study } = this.props;

    if (this.state.page === 'task') {
      return (
        <Task
          user={user}
          study={study}
          taskId={this.props.taskId}
          parameters={this.props.parameters}
          template={this.props.template}
          policy={this.props.policy}
          handleFinish={this.setToken}
        />
      );
    }

    if (this.state.page === 'post') {
      return (
        <Post
          user={user}
          study={study}
          task={this.props.taskId}
          policy={this.props.policy}
          onClosePrompt={this.closePrompt}
          token={this.state.token}
        />
      );
    }

    return <div>No task found</div>;
  }
}

export default RunExperiment;
