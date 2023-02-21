import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { OutCustomPort } from './OutPortModal';

export class OutPortFactory extends AbstractModelFactory {
  constructor() {
    super('outCustomPort');
  }

  generateModel() {
    return new OutCustomPort();
  }
}
