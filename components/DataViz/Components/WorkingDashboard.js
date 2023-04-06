import React from "react";
import styled from "styled-components";
import PipelineOperator from "./PipelineOperator";

import FilterArea from "../Operations/FilterArea";
import CalculateArea from "../Operations/CalculateArea";

import DisplaySpec from "../Display/index";

import Render from "./Render";

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
  console.log({ spec });
  const transformPipe = spec.transform || [];
  const operation = transformPipe[activeTransformationPosition] || {};
  const operationType =
    Object.keys(operation).length && Object.keys(operation)[0].toUpperCase();

  return (
    <StyledDashboard>
      <Render data={data} spec={spec} updateState={updateState} />

      <StyledDisplayArea>
        {spec.mark && (
          <DisplaySpec
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
      </StyledDisplayArea>

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
          {operationType === "FILTER" && (
            <FilterArea
              transformedData={transformedData}
              updateSpec={updateSpec}
              operation={operation}
              helper={helper}
              spec={spec}
              activeTransformationPosition={activeTransformationPosition}
            />
          )}
          {operationType === "CALCULATE" && (
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
    </StyledDashboard>
  );
};

export default WorkingDashboard;
