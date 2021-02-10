import React from 'react';
import styled from 'styled-components';
import PipelineOperator from './PipelineOperator';

import FilterArea from '../Operations/FilterArea';
import CalculateArea from '../Operations/CalculateArea';
import AggregateArea from '../Operations/AggregateArea';
import DisplayArea from '../Operations/DisplayArea';

import Render from './Render';

const StyledActiveArea = styled.div`
  display: grid;
  border: 1px solid grey;
  margin: 5px;
  padding: 10px;
`;

const WorkingDashboard = ({
  data,
  columnsToFilter,
  updateState,
  helper,
  activeOperationPosition,
  currentStateData,
  transformPipe,
  spec,
}) => {
  const header = 'Working Area';
  const operation = transformPipe[activeOperationPosition];
  const operationType = transformPipe[activeOperationPosition]?.type;
  return (
    <div>
      <h1>{header}</h1>
      <PipelineOperator
        data={data}
        currentStateData={currentStateData}
        columnsToFilter={columnsToFilter}
        updateState={updateState}
        helper={helper}
        activeOperationPosition={activeOperationPosition}
        transformPipe={transformPipe}
      />
      <StyledActiveArea>
        <h3>Active area</h3>
        <p>Active operation position is {activeOperationPosition}</p>
        <p>Operation type: {operationType}</p>
        <p>{JSON.stringify(operation)}</p>
        {operationType === 'FILTER' && (
          <FilterArea
            currentStateData={currentStateData}
            activeOperationPosition={activeOperationPosition}
            updateState={updateState}
            operation={operation}
            helper={helper}
            transformPipe={transformPipe}
          />
        )}
        {operationType === 'CALCULATE' && (
          <CalculateArea
            currentStateData={currentStateData}
            activeOperationPosition={activeOperationPosition}
            updateState={updateState}
            operation={operation}
            helper={helper}
            transformPipe={transformPipe}
          />
        )}
        {operationType === 'AGGREGATE' && (
          <AggregateArea
            currentStateData={currentStateData}
            activeOperationPosition={activeOperationPosition}
            updateState={updateState}
            operation={operation}
            helper={helper}
            transformPipe={transformPipe}
          />
        )}
        {operationType === 'DISPLAY' && (
          <DisplayArea
            currentStateData={currentStateData}
            activeOperationPosition={activeOperationPosition}
            updateState={updateState}
            operation={operation}
            helper={helper}
            transformPipe={transformPipe}
          />
        )}

        <Render data={currentStateData} transform={transformPipe} spec={spec} />
      </StyledActiveArea>
    </div>
  );
};

export default WorkingDashboard;
