import React, { Component } from 'react';
import dynamic from 'next/dynamic';

const Diagram = () => import('./Diagram/index');

const DynamicDiagram = dynamic(Diagram, {
  ssr: false,
});

// todo How to stop re-rendering the Diagram if the
// state of the study is updated

export default class Builder extends Component {
  render() {
    return (
      <DynamicDiagram
        handleSetMultipleValuesInState={
          this.props.handleSetMultipleValuesInState
        }
        diagram={this.props?.study?.diagram}
        {...this.props}
      />
    );
  }
}
