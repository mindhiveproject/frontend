import React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams-core';
import { StyledNode } from '../../styles';

export const MyAnchorWidget = props => (
  <StyledNode taskType="ANCHOR">
    <div
      className="anchoredArea"
      // onMouseDown={() => {
      //   console.log('Mouse enter');
      //   props.engine.getModel().setLocked(true); // lock the model
      // }}
      // onMouseUp={() => {
      //   console.log('Mouse leaves');
      //   props.engine.getModel().setLocked(false); // unlock the model
      // }}
    >
      <div
        className="node-header-container"
        style={{ backgroundColor: 'white' }}
      >
        <div className="node-header-text">Participant registration</div>
      </div>

      <div className="node-content">Start buiding your study from here</div>
    </div>

    <PortWidget
      className="port-container bottom-port"
      engine={props.engine}
      port={props.node.getPort('out')}
    >
      <div className="my-out-port"></div>
    </PortWidget>
  </StyledNode>
);
