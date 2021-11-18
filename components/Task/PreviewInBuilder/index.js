import React, { Component } from 'react';
import { ExperimentWindow } from '../../Labjs/preview';
import { PreviewInBuilderScreen, CloseButton } from './styles';

class ExperimentPreview extends Component {
  render() {
    return (
      <PreviewInBuilderScreen>
        <CloseButton onClick={this.props.handleFinish}>&times;</CloseButton>
        <ExperimentWindow
          settings={{
            script: this.props.template.script,
            style: this.props.template.style,
            params: this.props.parameters?.reduce((obj, item) => {
              obj[item.name] = item.value;
              return obj;
            }, {}),
            policy: 'preview',
            on_finish: () => {
              this.props.handleFinish();
            },
          }}
        />
      </PreviewInBuilderScreen>
    );
  }
}

export default ExperimentPreview;
