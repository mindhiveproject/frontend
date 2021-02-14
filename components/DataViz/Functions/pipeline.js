// add a new operation to a transformPipe
const addTransformOperation = (spec, template, updateSpec) => {
  const transform = spec.transform || [];
  const newTransform = [...transform];
  newTransform.push(template);
  updateSpec('transform', newTransform);
};

// remove an operation from a transformPipe by index
const removeTransformOperation = (spec, position, updateSpec) => {
  const transform = spec.transform || [];
  const newTransform = [...transform];
  newTransform.splice(position, 1);
  updateSpec('transform', newTransform);
};

// activate an operation
const activateOperation = (type, position, updateState) => {
  if (type === 'TRANSFORM') {
    updateState('activeTransformationPosition', position);
  }
};

// add display operation with reasonable defaults
const addDisplayOperation = (spec, updateState) => {
  const newSpec = { ...spec } || {};
  const defaultSpec = {
    width: 400,
    height: 200,
    mark: 'bar',
    transform: [],
    encoding: {
      x: { field: 'color', type: 'ordinal' },
      y: { field: 'duration', type: 'quantitative' },
    },
    data: { name: 'values' },
    ...newSpec,
  };
  updateState('spec', defaultSpec);
};

const PipelineFunctions = {
  addTransformOperation,
  removeTransformOperation,
  activateOperation,
  addDisplayOperation,
};

export default PipelineFunctions;
