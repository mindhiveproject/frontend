import React, { Component } from 'react';
import dynamic from 'next/dynamic';

import { StyledBoard } from '../styles';
import Settings from './Settings/index';

const Diagram = () => import('./Diagram/index');

const DynamicDiagram = dynamic(Diagram, {
  ssr: false,
});

// todo How to stop re-rendering the Diagram if the
// state of the study is updated

export default class Builder extends Component {
  render() {
    return (
      <StyledBoard>
        <DynamicDiagram
          handleSetMultipleValuesInState={
            this.props.handleSetMultipleValuesInState
          }
          diagram={this.props?.study?.diagram}
        />
        <Settings {...this.props} />
      </StyledBoard>
    );
  }
}
