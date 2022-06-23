import React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { MyNodeModel } from './MyNodeModel';
import { MyNodeWidget } from './node-widget/MyNodeWidget';

// TODO: Refactor to hooks
export class NodesFactory extends AbstractReactFactory {
  constructor() {
    super('my-node');
  }

  generateModel(initialConfig) {
    return new MyNodeModel();
  }

  generateReactWidget(event) {
    return <MyNodeWidget engine={this.engine} node={event.model} />;
  }
}
