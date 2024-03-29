import React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams-core';
import { StyledNode } from '../../styles';

export const DesignWidget = props => (
  <StyledNode taskType="DESIGN">
    <div
      className="node-header-container"
      style={{ backgroundColor: props.node.color }}
    >
      <div className="node-header-text">{props.node?.options?.name}</div>

      <div className="node-header-icons">
        <div
          className="icon"
          aria-hidden="true"
          onClick={() => {
            // lock the model
            props.engine.getModel().setLocked(true);
            // open the modal
            props.engine.openComponentModal({
              node: props?.node,
              isEditorOpen: true,
              isInfoOpen: false,
              isPreviewOpen: false,
            });
          }}
        >
          <img src="/content/icons/settings-2.svg" />
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
  </StyledNode>
);
