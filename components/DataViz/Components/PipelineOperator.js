import React from 'react';
import styled from 'styled-components';

import PipelineFunctions from '../Functions/pipeline';

const StyledPipelineOperator = styled.div`
  display: grid;
  align-content: flex-start;
  .pipelineButtons {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: auto auto;
    justify-content: flex-start;
    margin-bottom: 5px;
  }
  .operations {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 1fr;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const StyledOperationThumb = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 3fr 1fr;
  border: 1px solid grey;
  align-items: center;
  cursor: pointer;
  background: ${props => (props.active ? '#007c70' : 'white')};
  color: ${props => (props.active ? 'white' : 'black')};
`;

// displays controllers for editing the pipeline and activating one of the operations
const PipelineOperator = ({
  data,
  updateState,
  updateSpec,
  helper,
  pipeline,
  activeTransformationPosition,
  spec,
}) => {
  const transformPipe = spec.transform || [];

  const header = 'Preprocessing pipeline';
  const filterTemplate = {
    filter: {},
  };
  const calculateTemplate = {
    calculate: '',
    as: '',
  };

  return (
    <StyledPipelineOperator>
      <div className="pipelineButtons">
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
            ADD FILTER
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
            ADD CALCULATION
          </button>
        </div>
      </div>

      <div className="operations">
        {transformPipe.map((operation, position) => {
          const operationName = Object.keys(operation)[0].toUpperCase();
          return (
            <StyledOperationThumb
              key={position}
              active={activeTransformationPosition === position}
            >
              <div
                onClick={() =>
                  PipelineFunctions.activateOperation(
                    'TRANSFORM',
                    position,
                    updateState
                  )
                }
              >
                <span>
                  {position + 1}) {operationName}
                </span>
              </div>
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
            </StyledOperationThumb>
          );
        })}
      </div>
    </StyledPipelineOperator>
  );
};

export default PipelineOperator;
