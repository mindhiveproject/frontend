import React, { Component } from 'react';
import { ExperimentWindow } from '../../Labjs/preview';
import { PreviewContainer, Preview, CloseButton } from './styles';

class ExperimentPreview extends Component {
  render() {
    return (
      <PreviewContainer>
        <Preview>
          <CloseButton onClick={this.props.handleFinish}>&times;</CloseButton>
          <ExperimentWindow
            settings={{
              script: this.props.template.script,
              style: this.props.template.style,
              params: this.props.parameters.reduce((obj, item) => {
                obj[item.name] = item.value;
                return obj;
              }, {}),
              policy: 'preview',
              on_finish: () => {
                console.log('Not saving any data in preview mode');
                this.props.handleFinish();
              },
            }}
          />
        </Preview>
      </PreviewContainer>
    );
  }
}

export default ExperimentPreview;
