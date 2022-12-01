import React, { Component } from 'react';
import dynamic from 'next/dynamic';

import ComponentViewer from './Component/index.js';

import { StyledBoard } from '../styles';

const Diagram = () => import('./Diagram/index');

const DynamicDiagram = dynamic(Diagram, {
  ssr: false,
});

export default class Builder extends Component {
  state = {
    isModalOpen: false,
    componentModalID: null,
    testModalId: null,
    engine: null, // used to modify the nodes
    node: null,
    preview: false,
  };

  openComponentModal = ({ engine, node, preview }) => {
    console.log(preview);
    const componentID = node?.options?.componentID;
    const testId = node?.options?.testId;
    this.setState({
      isModalOpen: true,
      componentModalID: componentID,
      testModalId: testId,
      engine,
      node,
      preview,
    });
  };

  closeComponentModal = () => {
    const { engine } = this.state;
    engine.getModel().setLocked(false); // unlock the model
    this.setState({
      isModalOpen: false,
      componentModalID: null,
      testModalId: null,
      preview: false,
    });
  };

  updateCanvas = task => {
    const { engine, node } = this.state;
    const { model } = engine;
    const nodes = model.getNodes() || [];
    const componentID = node?.options?.componentID;
    // use componentID to filter the nodes
    // that allows to update multiple nodes with the same task
    nodes.forEach(n => {
      if (n?.options?.componentID === componentID) {
        n.updateOptions({
          componentID: task?.id,
          name: task?.title,
          details: task?.description,
        });
      }
    });
    engine.repaintCanvas();
  };

  render() {
    const { study, handleSetMultipleValuesInState } = this.props;
    const { isModalOpen, componentModalID, testModalId, preview } = this.state;
    return (
      <StyledBoard>
        <DynamicDiagram
          handleSetMultipleValuesInState={handleSetMultipleValuesInState}
          diagram={study?.diagram}
          openComponentModal={this.openComponentModal}
          {...this.props}
        />
        {isModalOpen && (
          <ComponentViewer
            {...this.props}
            componentID={componentModalID}
            testId={testModalId}
            closeModal={this.closeComponentModal}
            updateCanvas={this.updateCanvas}
            preview={preview}
          />
        )}
      </StyledBoard>
    );
  }
}
