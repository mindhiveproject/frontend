import React, { Component } from 'react';
import { ExperimentWindow } from '../../Labjs/review';
import { PreviewContainer, Preview } from './styles';

class Task extends Component {
  onClose = () => {
    if (
      confirm(
        'Are you sure you want to interrupt your task without finishing? You will have to start this task from the beginning.'
      )
    ) {
      this.props.handleFinish();
    }
  };

  render() {
    const { user, study, template, parameters, policy, version } = this.props;

    return (
      <PreviewContainer>
        <Preview>
          <ExperimentWindow
            showPreview
            onClose={this.onClose}
            settings={{
              user: user.id,
              template: template.id,
              task: this.props.taskId,
              study: study.id,
              script: template.script,
              style: template.style,
              params: parameters?.reduce((obj, item) => {
                obj[item.name] = item.value;
                return obj;
              }, {}),
              policy,
              on_finish: token => {
                this.props.handleFinish(token);
              },
              version,
            }}
          />
        </Preview>
      </PreviewContainer>
    );
  }
}

export default Task;

// <CloseButton onClick={this.onClose}>&times;</CloseButton>
