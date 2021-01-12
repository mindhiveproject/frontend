import React from 'react';
import FilterFunctions from '../Functions/filter';

// selects and edit filters (its parameters) and change it in the pipeline
const FilterArea = ({
  pipeline,
  activeOperationPosition,
  updateState,
  operation,
}) => {
  const header = 'Filter Area';

  // mocking parameters for filtering
  const parameters = {
    column: 'response',
    operator: 'equal',
    value: 'blue',
  };
  // console.log('pipeline', pipeline);
  return (
    <div>
      <h3>{header}</h3>
      <button
        onClick={() =>
          FilterFunctions.addFilter(
            pipeline,
            activeOperationPosition,
            parameters,
            updateState
          )
        }
      >
        Add a filter
      </button>
    </div>
  );
};

export default FilterArea;
