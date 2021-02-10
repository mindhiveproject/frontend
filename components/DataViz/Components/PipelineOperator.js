import React from 'react';
import styled from 'styled-components';

import PipelineFunctions from '../Functions/pipeline';

const StyledPipelineOperator = styled.div`
  display: grid;
  border: 1px solid grey;
  margin: 5px;
  padding: 10px;
  .operations {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  .operationThumb {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 3fr 2fr 1fr;
    border: 1px solid grey;
  }
`;

// displays controllers for editing the pipeline and activating one of the operations
const PipelineOperator = ({
  data,
  columnsToFilter,
  updateState,
  helper,
  pipeline,
  activeOperationPosition,
  transformPipe,
}) => {
  const header = 'Pipeline operator';
  const filterTemplate = {
    type: 'FILTER',
  };
  const calculateTemplate = {
    type: 'CALCULATE',
  };
  const aggregationTemplate = {
    type: 'AGGREGATE',
  };
  const displayTemplate = {
    type: 'DISPLAY',
  };
  return (
    <StyledPipelineOperator>
      <h3>{header}</h3>
      <p>Transform pipeline length {transformPipe.length}</p>
      <p>Active operation is {activeOperationPosition}</p>
      <div className="operations">
        {transformPipe.map((operation, position) => (
          // console.log('operation', position, operation);
          <div className="operationThumb" key={position}>
            <span>{operation.type}</span>
            <button
              onClick={() =>
                PipelineFunctions.activateOperation(position, updateState)
              }
            >
              Edit
            </button>
            <button
              onClick={() =>
                PipelineFunctions.removeOperation(
                  transformPipe,
                  position,
                  updateState
                )
              }
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() =>
            PipelineFunctions.addOperation(
              transformPipe,
              filterTemplate,
              updateState
            )
          }
        >
          Add filtering operation
        </button>

        <button
          onClick={() =>
            PipelineFunctions.addOperation(
              transformPipe,
              calculateTemplate,
              updateState
            )
          }
        >
          Add calculation operation
        </button>

        <button
          onClick={() =>
            PipelineFunctions.addOperation(
              transformPipe,
              aggregationTemplate,
              updateState
            )
          }
        >
          Add aggregation operation
        </button>

        <button
          onClick={() =>
            PipelineFunctions.addOperation(
              transformPipe,
              displayTemplate,
              updateState
            )
          }
        >
          Add display operation
        </button>
      </div>
    </StyledPipelineOperator>
  );
};

export default PipelineOperator;
