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
    grid-template-columns: 1fr;
    /* grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); */
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
  updateSpec,
  helper,
  pipeline,
  activeOperationPosition,
  activeTransformationPosition,
  spec,
}) => {
  const transformPipe = spec.transform || [];

  const header = 'Pipeline operator';
  const filterTemplate = {
    filter: {},
  };
  const calculateTemplate = {
    calculate: '',
    as: '',
  };
  const aggregationTemplate = {
    aggregate: [],
    groupby: [],
  };
  const displayTemplate = {
    type: 'DISPLAY',
  };
  return (
    <StyledPipelineOperator>
      <h3>{header}</h3>
      <p>Transform pipeline length {transformPipe.length}</p>
      <p>
        Active transformation operation's position is{' '}
        {activeTransformationPosition}
      </p>
      <div className="operations">
        {transformPipe.map((operation, position) => {
          const operationName = Object.keys(operation)[0].toUpperCase();
          return (
            <div className="operationThumb" key={position}>
              <span>{operationName}</span>
              <button
                onClick={() =>
                  PipelineFunctions.activateOperation(
                    'TRANSFORM',
                    position,
                    updateState
                  )
                }
              >
                Edit
              </button>
              <button
                onClick={() =>
                  PipelineFunctions.removeTransformOperation(
                    spec,
                    position,
                    updateSpec
                  )
                }
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <div>
          <button
            onClick={() =>
              PipelineFunctions.addTransformOperation(
                spec,
                filterTemplate,
                updateSpec
              )
            }
          >
            + FILTER
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              PipelineFunctions.addTransformOperation(
                spec,
                calculateTemplate,
                updateSpec
              )
            }
          >
            + CALCULATION
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              PipelineFunctions.addTransformOperation(
                spec,
                aggregationTemplate,
                updateSpec
              )
            }
          >
            + AGGREGATION
          </button>
        </div>
        // TO do - make display separate
        <div>
          <button
            onClick={() =>
              PipelineFunctions.addDisplayOperation(spec, updateState)
            }
          >
            + DISPLAY
          </button>
        </div>
      </div>
    </StyledPipelineOperator>
  );
};

export default PipelineOperator;
