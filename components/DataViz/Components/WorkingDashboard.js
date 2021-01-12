import React from 'react';
import styled from 'styled-components';
import PipelineOperator from './PipelineOperator';

import FilterArea from '../Operations/FilterArea';

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
  pipeline,
  activeOperationPosition,
}) => {
  const header = 'Working Area';
  const operation = pipeline[activeOperationPosition];
  const operationType = pipeline[activeOperationPosition]?.type;
  // console.log('pipeline', pipeline);
  return (
    <div>
      <h1>{header}</h1>
      <PipelineOperator
        data={data}
        columnsToFilter={columnsToFilter}
        updateState={updateState}
        helper={helper}
        pipeline={pipeline}
        activeOperationPosition={activeOperationPosition}
      />
      <StyledActiveArea>
        <h3>Active area</h3>
        <p>Active operation is {activeOperationPosition}</p>
        <p>Operation type: {operationType}</p>
        <p>{JSON.stringify(operation)}</p>
        {operationType === 'FILTER' && (
          <FilterArea
            pipeline={pipeline}
            activeOperationPosition={activeOperationPosition}
            updateState={updateState}
            operation={operation}
          />
        )}
      </StyledActiveArea>
    </div>
  );
};

export default WorkingDashboard;
