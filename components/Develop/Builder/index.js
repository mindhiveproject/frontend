import React, { Component } from 'react';
import dynamic from 'next/dynamic';

import ComponentWrapper from './Component/wrapper.js';

import { StyledBoard } from '../styles';

const Diagram = () => import('./Diagram/index');

const DynamicDiagram = dynamic(Diagram, {
  ssr: false,
});

// todo How to stop re-rendering the Diagram if the
// state of the study is updated

export default class Builder extends Component {
  state = {
    isModalOpen: false,
    componentModalID: null,
    engine: null, // use as a way to modify the nodes
    node: null,
  };

  openComponentModal = ({ engine, node }) => {
    const componentID = node?.options?.componentID;
    this.setState({
      isModalOpen: true,
      componentModalID: componentID,
      engine,
      node,
    });
  };

  closeComponentModal = () => {
    // unlock the model
    const { engine } = this.state;
    engine.getModel().setLocked(false);
    this.setState({
      isModalOpen: false,
      componentModalID: null,
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
    return (
      <StyledBoard>
        <DynamicDiagram
          handleSetMultipleValuesInState={
            this.props.handleSetMultipleValuesInState
          }
          diagram={this.props?.study?.diagram}
          openComponentModal={this.openComponentModal}
          {...this.props}
        />
        {this.state.isModalOpen && (
          <ComponentWrapper
            {...this.props}
            componentID={this.state.componentModalID}
            closeModal={this.closeComponentModal}
            updateCanvas={this.updateCanvas}
          />
        )}
      </StyledBoard>
    );
  }
}
