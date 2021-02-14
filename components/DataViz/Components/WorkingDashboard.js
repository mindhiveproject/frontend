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
  updateSpec,
  helper,
  activeTransformationPosition,
  currentStateData,
  spec,
}) => {
  const header = 'Working Area';
  const transformPipe = spec.transform || [];
  const operation = transformPipe[activeTransformationPosition] || {};
  const operationType =
    Object.keys(operation).length && Object.keys(operation)[0].toUpperCase();

  return (
    <div>
      <h1>{header}</h1>
      <PipelineOperator
        data={data}
        currentStateData={currentStateData}
        columnsToFilter={columnsToFilter}
        updateState={updateState}
        updateSpec={updateSpec}
        helper={helper}
        activeTransformationPosition={activeTransformationPosition}
        spec={spec}
      />
      <StyledActiveArea>
        <h3>Active area</h3>
        <p>Active transformation position is {activeTransformationPosition}</p>
        <p>Operation type: {operationType}</p>
        <p>{JSON.stringify(operation)}</p>
        {operationType === 'FILTER' && (
          <FilterArea
            currentStateData={currentStateData}
            updateSpec={updateSpec}
            operation={operation}
            helper={helper}
            spec={spec}
            activeTransformationPosition={activeTransformationPosition}
          />
        )}
        {operationType === 'CALCULATE' && (
          <CalculateArea
            currentStateData={currentStateData}
            updateSpec={updateSpec}
            operation={operation}
            helper={helper}
            spec={spec}
            activeTransformationPosition={activeTransformationPosition}
          />
        )}
        {operationType === 'AGGREGATE' && (
          <AggregateArea
            currentStateData={currentStateData}
            updateSpec={updateSpec}
            operation={operation}
            helper={helper}
            spec={spec}
            activeTransformationPosition={activeTransformationPosition}
          />
        )}

        {spec.mark && (
          <DisplayArea
            currentStateData={currentStateData}
            updateSpec={updateSpec}
            updateState={updateState}
            operation={operation}
            helper={helper}
            spec={spec}
            activeTransformationPosition={activeTransformationPosition}
          />
        )}

        <Render data={currentStateData} spec={spec} />
      </StyledActiveArea>
    </div>
  );
};

export default WorkingDashboard;
