import React, { Component } from 'react';
import { ExperimentWindow } from '../../Labjs/containerPreview';
import { PreviewContainer, Preview, CloseButton } from './styles';

class ContainerPreview extends Component {
  render() {
    const { showPreview } = this.props;
    return (
      <Preview>
        {showPreview && (
          <ExperimentWindow
            showPreview
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
        )}
      </Preview>
    );
  }
}

export default ContainerPreview;
