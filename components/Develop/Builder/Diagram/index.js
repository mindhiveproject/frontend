import React, { useState, useEffect } from 'react';

import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import uniqid from 'uniqid';
import generate from 'project-name-generator';

import { NodesFactory } from './components/NodesFactory';
import { MyCreatorWidget } from './components/my-creator-widget/MyCreatorWidget';

import { StyledDigram } from './styles';

const Diagram = React.memo(props => {
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    const handleMouseUp = () => {
      saveDiagramState();
    };
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  useEffect(() => {
    function startEngine() {
      if (!engine) {
        const newEngine = createEngine();
        newEngine.setModel(new DiagramModel());
        // Create custom node
        newEngine.getNodeFactories().registerFactory(new NodesFactory());
        setEngine(newEngine);
      }

      if (engine && props.diagram) {
        const model2 = new DiagramModel();
        model2.deserializeModel(JSON.parse(props.diagram), engine);
        engine.setModel(model2);
      }
    }
    startEngine();
    return () => {
      // console.log('closing diagram');
    };
  }, [engine, props.diagram]); // Only re-subscribe if props.diagram

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
        blocks.push(makeBlock(blockTests));
      }
    });
  };

  const createStudyDesign = ({ model }) => {
    const nodes = model.getNodes() || [];
    const blocks = [];
    const startingNodes = nodes.filter(
      node => Object.keys(node?.ports?.in?.links).length === 0
    );
    findChildrenRecursively(startingNodes, 0, blocks, []);
    return { blocks };
  };

  const saveDiagramState = () => {
    const { model } = engine;
    // Serializing
    const diagram = JSON.stringify(model.serialize());
    // Get the experiment model
    const components = createStudyDesign({ model });
    // console.log('studyDesign components', components);
    props.handleSetMultipleValuesInState({ components, diagram });
  };

  const loadDiagramState = () => {
    // DESERIALIZING
    const model2 = new DiagramModel();
    // console.log('study?.diagram', props.study?.diagram);
    model2.deserializeModel(JSON.parse(props.study?.diagram), engine);
    engine.setModel(model2);
  };

  return (
    <StyledDigram>
      {false && <button onClick={saveDiagramState}>Save the state</button>}

      {engine && <MyCreatorWidget engine={engine} />}

      {false && <button onClick={loadDiagramState}>Load the state</button>}
    </StyledDigram>
  );
});

export default Diagram;
