const addFilterOperation = (
  spec,
  activeTransformationPosition,
  parameters,
  updateSpec
) => {
  const transform = spec.transform || [];
  const newTransform = [...transform];
  newTransform[activeTransformationPosition] = {
    filter: {
      field: parameters.field,
      [parameters.predicate]: parameters.value,
      predicate: parameters.predicate,
      value: parameters.value,
    },
  };
  updateSpec('transform', newTransform);
};

const addCalculateOperation = (
  spec,
  activeTransformationPosition,
  parameters,
  updateSpec
) => {
  const transform = spec.transform || [];
  const newTransform = [...transform];
  newTransform[activeTransformationPosition] = {
    calculate: parameters.calculate,
    as: parameters.as,
  };
  updateSpec('transform', newTransform);
};

const addAggregateOperation = (
  spec,
  activeTransformationPosition,
  parameters,
  updateSpec
) => {
  const transform = spec.transform || [];
  const newTransform = [...transform];
  newTransform[activeTransformationPosition] = {
    aggregate: [
      {
        op: parameters.op,
        field: parameters.field,
        as: parameters.as,
      },
    ],
    groupby: [parameters.groupby],
  };
  updateSpec('transform', newTransform);
};

const editDislaySpec = (spec, parameters, updateState) => {
  const previousSpec = { ...spec } || {};
  const newSpec = {
    ...previousSpec,
    ...parameters,
  };
  updateState('spec', newSpec);
};

const OperationFunctions = {
  addFilterOperation,
  addCalculateOperation,
  addAggregateOperation,
  editDislaySpec,
};

export default OperationFunctions;
