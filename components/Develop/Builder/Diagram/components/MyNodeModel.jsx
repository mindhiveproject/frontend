import { NodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';

export class MyNodeModel extends NodeModel {
  constructor(options) {
    super({
      ...options,
      type: 'my-node',
    });

    if (options) {
      this.color = options.color || 'black';
    }

    // setup an in and out port
    this.addPort(
      new DefaultPortModel({
        in: true,
        name: 'in',
      })
    );
    this.addPort(
      new DefaultPortModel({
        in: false,
        name: 'out',
      })
    );
  }
}
