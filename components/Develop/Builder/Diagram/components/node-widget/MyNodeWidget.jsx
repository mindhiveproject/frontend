import React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams-core';

export const MyNodeWidget = props => (
  <>
    <button
      onClick={() => {
        // console.log('props', props);
        props.engine.openComponentModal({
          componentID: props.node.options.componentID,
        });
        // props.node.options.name = 'HACKED';
      }}
    >
      Edit
    </button>
    <div className="my-node">
      <div
        className="my-node-header-container"
        style={{ backgroundColor: props.node.color }}
      >
        <div className="my-icon" />
        <div className="my-node-header-text">{props.node?.options?.name}</div>
      </div>

      <PortWidget
        className="port-container up-port"
        engine={props.engine}
        port={props.node.getPort('in')}
      >
        <div className="my-port" />
      </PortWidget>

      <div className="my-node-content">{props.node?.options?.details}</div>

      <PortWidget
        className="port-container bottom-port"
        engine={props.engine}
        port={props.node.getPort('out')}
      >
        <div className="my-port" />
      </PortWidget>
    </div>
  </>
);
