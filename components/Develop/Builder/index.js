import React, { Component } from 'react';
import dynamic from 'next/dynamic';

import { StyledBoard } from '../styles';
import Settings from './Settings/index';

const Diagram = () => import('./Diagram/index');

const DynamicDiagram = dynamic(Diagram, {
  ssr: false,
});

export default class Builder extends Component {
  render() {
    return (
      <StyledBoard>
        <DynamicDiagram {...this.props} />
        <Settings {...this.props} />
      </StyledBoard>
    );
  }
}
