import React, { Component } from 'react';
import dynamic from 'next/dynamic';

import ComponentModal from './Component/modal.js';

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
  };

  openComponentModal = ({ componentID }) => {
    this.setState({
      isModalOpen: true,
      componentModalID: componentID,
    });
  };

  closeComponentModal = () => {
    this.setState({
      isModalOpen: false,
      componentModalID: null,
    });
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
          <ComponentModal
            {...this.props}
            componentID={this.state.componentModalID}
            closeModal={this.closeComponentModal}
          />
        )}
      </StyledBoard>
    );
  }
}
