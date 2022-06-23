import React, { Children } from 'react';

import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import uniqid from 'uniqid';
import generate from 'project-name-generator';

import { NodesFactory } from './components/NodesFactory';
import { MyCreatorWidget } from './components/my-creator-widget/MyCreatorWidget';

import { StyledDigram } from './styles';
import { savedString } from './helpers/modelExamples';

function Diagram() {
  const engine = createEngine();
  engine.setModel(new DiagramModel());

  // Create custom node
  engine.getNodeFactories().registerFactory(new NodesFactory());

  const findChildren = node => {
    let children = [];
    if (
      node?.ports?.out?.links &&
      Object.values(node?.ports?.out?.links).length
    ) {
      children = Object.values(node?.ports?.out?.links).map(
        link => link?.targetPort?.parent
      );
    }
    return children;
  };

  const makeBlock = tests => ({
    blockId: uniqid.time(),
    title: generate().dashed,
    tests: [...tests],
    skip: false,
  });

  const findChildrenRecursively = (nodes, level, blocks, tests) => {
    nodes.forEach(node => {
      let blockTests;
      if (level === 0) {
        blockTests = [
          {
            id: node?.options?.componentID,
            title: node?.options?.name,
            testId: uniqid.time(),
            level: 0,
          },
        ];
      } else {
        blockTests = [...tests];
        blockTests.push({
          id: node?.options?.componentID,
          title: node?.options?.name,
          testId: uniqid.time(),
          level,
        });
      }
      const children = findChildren(node) || [];
      if (children.length) {
        findChildrenRecursively(children, level + 1, blocks, blockTests);
      } else {
        console.log('End');
        console.log({ blockTests });
        blocks.push(makeBlock(blockTests));
      }
    });
  };

  const onButtonClick = () => {
    const { model } = engine;
    // SERIALIZING
    const str = JSON.stringify(model.serialize());
    const nodes = model.getNodes() || [];
    const blocks = [];
    const startingNodes = nodes.filter(
      node => Object.keys(node?.ports?.in?.links).length === 0
    );
    findChildrenRecursively(startingNodes, 0, blocks, []);
    // console.log({ blocks });
  };

  const loadString = () => {
    // DESERIALIZING
    const model2 = new DiagramModel();
    model2.deserializeModel(JSON.parse(savedString), engine);
    engine.setModel(model2);
  };

  return (
    <StyledDigram>
      <MyCreatorWidget engine={engine} />
      <button onClick={onButtonClick}>Get the state</button>
      <button onClick={loadString}>Load the saved model</button>
    </StyledDigram>
  );
}

export default Diagram;

const example = {
  blocks: [
    {
      blockId: 'kzr1pfd4',
      title: 'Experimental',
      tests: [
        {
          id: 'ckzr1gn8ih0v00999phywg8dt',
          title: 'Stroop task',
          testId: 'kzr1pfd5',
        },
      ],
    },
    {
      blockId: 'kzr1prn6',
      title: 'Control',
      tests: [
        {
          id: 'ckzr1gn8ih0v00999phywg8dt',
          title: 'Stroop task',
          testId: 'kzr1pt5r',
        },
      ],
      skip: false,
    },
  ],
};
