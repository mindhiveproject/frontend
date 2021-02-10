// add a new operation to a transformPipe
const addOperation = (transformPipe, operation, updateState) => {
  console.log('operation', operation);
  transformPipe.push(operation);
  updateState('transformPipe', transformPipe);
};

// remove an operation from a transformPipe by index
const removeOperation = (transformPipe, position, updateState) => {
  transformPipe.splice(position, 1);
  updateState('transformPipe', transformPipe);
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
