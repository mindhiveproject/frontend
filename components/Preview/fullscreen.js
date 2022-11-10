import React, { Component } from 'react';
import { PreviewContainer, Preview, CloseButton } from './styles';

import { ExperimentWindow } from '../Labjs/preview';
import StudyWindow from './Study/index';

class FullScreenPreview extends Component {
  render() {
    return (
      <PreviewContainer>
        <Preview>
          <CloseButton onClick={() => this.props.handleFinish()}>
            &times;
          </CloseButton>
          {this.props.previewOf === 'study' && (
            <StudyWindow study={this.props.study} />
          )}
          {this.props.previewOf === 'component' && (
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
          )}
        </Preview>
      </PreviewContainer>
    );
  }
}

export default FullScreenPreview;
