// add a new operation to a pipeline
const addOperation = (pipeline, operation, updateState) => {
  pipeline.push(operation);
  updateState('pipeline', pipeline);
};

// remove an operation from a pipeline by index
const removeOperation = (pipeline, position, updateState) => {
  pipeline.splice(position, 1);
  updateState('pipeline', pipeline);
};

// activate an operation
const activateOperation = (activeOperationPosition, updateState) => {
  updateState('activeOperationPosition', activeOperationPosition);
};

const PipelineFunctions = {
  addOperation,
  removeOperation,
  activateOperation,
};

export default PipelineFunctions;
