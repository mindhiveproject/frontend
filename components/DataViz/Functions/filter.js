// add a new filter parameters to a pipeline
const addFilter = (
  pipeline,
  activeOperationPosition,
  parameters,
  updateState
) => {
  pipeline[activeOperationPosition].parameters = parameters;
  updateState('pipeline', pipeline);
};

const FilterFunctions = {
  addFilter,
};

export default FilterFunctions;
