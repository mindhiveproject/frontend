import React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { MyCommentModel } from './MyCommentModel';
import { MyCommentWidget } from './node-widget/MyCommentWidget';

export class CommentsFactory extends AbstractReactFactory {
  constructor() {
    super('my-comment');
  }

  generateModel(initialConfig) {
    return new MyCommentModel();
  }

  generateReactWidget(event) {
    return <MyCommentWidget engine={this.engine} node={event.model} />;
  }
}
