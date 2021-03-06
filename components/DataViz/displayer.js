import React from 'react';
import styled from 'styled-components';

import SpecEditor from './Components/SpecEditor';
import ColumnNamesList from './Components/ColumnNamesList';
import WorkingDashboard from './Components/WorkingDashboard';

const StyledContainer = styled.div`
  margin: 20px;
  display: grid;
`;

const StyledDisplayer = styled.div`
  display: grid;
  grid-template-columns: 2fr 7fr;
  grid-gap: 20px;
  border: 1px solid white;
  width: 90%;
  button {
    border: 1px solid grey;
    border-radius: 0;
    cursor: pointer;
    text-transform: uppercase;
    padding: 0.2rem 0.5rem;
    transform: skew(-2deg);
    display: inline-block;
    transition: all 0.5s;
    &[disabled] {
      opacity: 0.5;
    }
  }
  button: hover {
    background: rgb(246, 110, 94);
    a {
      color: white;
    }
  }
`;

// display things
// ColumnNamesList: the column names on the left
// WorkingDashboard: working area on the right
// SpecEditor specification editor

const Displayer = ({
  data,
  transformedData,
  columnsToFilter,
  updateState,
  updateSpec,
  helper,
  activeTransformationPosition,
  spec,
  onDatasetTypeChange,
  datasetType,
}) => {
  const header = 'Data Viz (version 0.0.2)';
  return (
    <StyledContainer>
      <h2>{header}</h2>

      <StyledDisplayer>
        <div>
          <ColumnNamesList
            data={data}
            transformedData={transformedData}
            updateState={updateState}
            helper={helper}
            onDatasetTypeChange={onDatasetTypeChange}
            datasetType={datasetType}
          />
          <SpecEditor spec={spec} updateState={updateState} />
        </div>
        <WorkingDashboard
          data={data}
          transformedData={transformedData}
          updateState={updateState}
          updateSpec={updateSpec}
          helper={helper}
          activeTransformationPosition={activeTransformationPosition}
          spec={spec}
        />
      </StyledDisplayer>
    </StyledContainer>
  );
};

export default Displayer;
