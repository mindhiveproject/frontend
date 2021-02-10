// add a new filter parameters to a pipeline
// const addFilter = (
//   pipeline,
//   activeOperationPosition,
//   parameters,
//   updateState
// ) => {
//   pipeline[activeOperationPosition].parameters = parameters;
//   console.log('pipeline', pipeline);
//   updateState('pipeline', pipeline);
// };

const addFilterOperation = (
  transformPipe,
  activeOperationPosition,
  parameters,
  updateState
) => {
  transformPipe[activeOperationPosition].parameters = {
    filter: {
      field: parameters.field,
      [parameters.predicate]: parameters.value,
      predicate: parameters.predicate,
      value: parameters.value,
    },
  };
  updateState('transformPipe', transformPipe);
};

const addCalculateOperation = (
  transformPipe,
  activeOperationPosition,
  parameters,
  updateState
) => {
  transformPipe[activeOperationPosition].parameters = {
    calculate: parameters.calculate,
    as: parameters.as,
  };
  updateState('transformPipe', transformPipe);
};

const addAggregateOperation = (
  transformPipe,
  activeOperationPosition,
  parameters,
  updateState
) => {
  transformPipe[activeOperationPosition].parameters = {
    aggregate: [
      {
        op: parameters.op,
        field: parameters.field,
        as: parameters.as,
      },
    ],
    groupby: [parameters.groupby],
  };
  updateState('transformPipe', transformPipe);
};

const OperationFunctions = {
  addFilterOperation,
  addCalculateOperation,
  addAggregateOperation,
};

export default OperationFunctions;
