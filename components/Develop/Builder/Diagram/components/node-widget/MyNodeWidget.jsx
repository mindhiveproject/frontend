import React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams-core';

export const MyNodeWidget = props => (
  <div className="node">
    <div
      className="node-header-container"
      style={{ backgroundColor: props.node.color }}
    >
      <div className="node-header-text">{props.node?.options?.name}</div>
      <div className="node-header-icons">
        <div
          className="icon"
          onClick={e => {
            // lock the model
            props.engine.getModel().setLocked(true);
            // open the modal
            props.engine.openComponentModal({ ...props, preview: false });
          }}
        >
          <img src="/content/icons/info-3.svg" />
        </div>
        <div
          className="icon"
          onClick={e => {
            // lock the model
            props.engine.getModel().setLocked(true);
            // open the preview
            props.engine.openComponentModal({ ...props, preview: true });
          }}
        >
          <img src="/content/icons/play.svg" />
        </div>
      </div>
    </div>

    <PortWidget
      className="port-container up-port"
      engine={props.engine}
      port={props.node.getPort('in')}
    >
      <div className="my-in-port">Drop the link here</div>
    </PortWidget>

    <div className="node-content">{props.node?.options?.details}</div>

    <PortWidget
      className="port-container bottom-port"
      engine={props.engine}
      port={props.node.getPort('out')}
    >
      <div className="my-out-port"></div>
    </PortWidget>
  </div>
);
