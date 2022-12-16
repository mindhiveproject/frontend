import React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { MyAnchorModel } from './MyAnchorModel';
import { MyAnchorWidget } from './node-widget/MyAnchorWidget';

export class AnchorFactory extends AbstractReactFactory {
  constructor() {
    super('my-anchor');
  }

  generateModel(initialConfig) {
    return new MyAnchorModel();
  }

  generateReactWidget(event) {
    return <MyAnchorWidget engine={this.engine} node={event.model} />;
  }
}
