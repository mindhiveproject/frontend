import React from 'react';
import styled from 'styled-components';
import PipelineOperator from './PipelineOperator';

import FilterArea from '../Operations/FilterArea';
import CalculateArea from '../Operations/CalculateArea';
import DisplayArea from '../Operations/DisplayArea';

import PipelineFunctions from '../Functions/pipeline';

import Render from './Render';

const StyledDashboard = styled.div`
  display: grid;
  border: 1px solid lightgrey;
  margin: 5px;
  padding: 10px;
  height: 100%;
  grid-template-rows: auto 1fr;
`;

const StyledPreprocessingArea = styled.div`
  display: grid;
  align-content: flex-start;
  min-height: 300px;
  .operationBoard {
    margin-top: 5px;
    border: 1px solid #ffffef;
    background: #ffffef;
  }
`;

const StyledDisplayArea = styled.div`
  display: grid;
  border-top: 1px solid lightgrey;
  height: 100%;
  grid-template-rows: auto 1fr;
`;

const WorkingDashboard = ({
  data,
  transformedData,
  updateState,
  updateSpec,
  helper,
  activeTransformationPosition,
  spec,
}) => {
  const transformPipe = spec.transform || [];
  const operation = transformPipe[activeTransformationPosition] || {};
  const operationType =
    Object.keys(operation).length && Object.keys(operation)[0].toUpperCase();

  return (
    <StyledDashboard>
      <StyledPreprocessingArea>
        <PipelineOperator
          data={data}
          transformedData={transformedData}
          updateState={updateState}
          updateSpec={updateSpec}
          helper={helper}
          activeTransformationPosition={activeTransformationPosition}
          spec={spec}
        />

        <div className="operationBoard">
          {operationType === 'FILTER' && (
            <FilterArea
              transformedData={transformedData}
              updateSpec={updateSpec}
              operation={operation}
              helper={helper}
              spec={spec}
              activeTransformationPosition={activeTransformationPosition}
            />
          )}
          {operationType === 'CALCULATE' && (
            <CalculateArea
              transformedData={transformedData}
              updateSpec={updateSpec}
              operation={operation}
              helper={helper}
              spec={spec}
              activeTransformationPosition={activeTransformationPosition}
            />
          )}
        </div>
      </StyledPreprocessingArea>

      <StyledDisplayArea>
        {spec.mark && (
          <DisplayArea
            data={data}
            transformedData={transformedData}
            updateSpec={updateSpec}
            updateState={updateState}
            operation={operation}
            helper={helper}
            spec={spec}
            activeTransformationPosition={activeTransformationPosition}
          />
        )}
        <Render data={data} spec={spec} updateState={updateState} />
      </StyledDisplayArea>
    </StyledDashboard>
  );
};

export default WorkingDashboard;

// {operationType === 'AGGREGATE' && (
//   <AggregateArea
//     transformedData={transformedData}

//     updateSpec={updateSpec}
//     operation={operation}
//     helper={helper}
//     spec={spec}
//     activeTransformationPosition={activeTransformationPosition}
//   />
// )}

// <div className="debuggerInfo">
//   <div>
//     Active transformation position is {activeTransformationPosition}
//   </div>
//   <div>Operation type: {operationType}</div>
//   <div>{JSON.stringify(operation)}</div>
// </div>

// <div>
//   <button
//     onClick={() =>
//       PipelineFunctions.addDisplayOperation(spec, updateState)
//     }
//   >
//     Initialize display
//   </button>
// </div>
