import { NodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';

export class MyAnchorModel extends NodeModel {
  constructor(options) {
    super({
      ...options,
      type: 'my-anchor',
    });

    if (options) {
      this.color = options.color || 'white';
    }

    // setup out port
    this.addPort(
      new DefaultPortModel({
        in: false,
        name: 'out',
        alignment: 'down',
      })
    );
  }

  updateOptions(options) {
    this.options = { ...this.options, ...options };
  }

  serialize() {
    return {
      ...super.serialize(),
    };
  }

  deserialize(ob, engine) {
    super.deserialize(ob, engine);
  }

  remove() {
    // the anchor should not be removed
    // so we don't call super.remove()
    // super.remove();
  }
}
