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
        alignment: 'top',
      })
    );
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
      name: this.options.name,
      details: this.options.details,
      componentID: this.options.componentID,
      testId: this.options.testId,
      taskType: this.options.taskType,
    };
  }

  deserialize(ob, engine) {
    super.deserialize(ob, engine);
    this.options.name = ob.data.name;
    this.options.details = ob.data.details;
    this.options.componentID = ob.data.componentID;
    this.options.testId = ob.data.testId;
    this.options.taskType = ob.data.taskType;
  }
}
