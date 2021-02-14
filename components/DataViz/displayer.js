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
  grid-template-columns: 2fr 4fr;
  grid-gap: 20px;
  border: 1px solid grey;
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
// SpecEditor specification editor
// ColumnNamesList: the column names on the left
// WorkingDashboard: working area on the right

const Displayer = ({
  data,
  currentStateData,
  columnsToFilter,
  updateState,
  updateSpec,
  helper,
  activeTransformationPosition,
  spec,
}) => {
  const header = 'Data Viz (version 0.0.1)';
  return (
    <StyledContainer>
      <h1>{header}</h1>
      <StyledDisplayer>
        <ColumnNamesList
          data={data}
          currentStateData={currentStateData}
          columnsToFilter={columnsToFilter}
          updateState={updateState}
          helper={helper}
        />
        <WorkingDashboard
          data={data}
          currentStateData={currentStateData}
          columnsToFilter={columnsToFilter}
          updateState={updateState}
          updateSpec={updateSpec}
          helper={helper}
          activeTransformationPosition={activeTransformationPosition}
          spec={spec}
        />
      </StyledDisplayer>

      <SpecEditor spec={spec} updateState={updateState} />

      <p>
        Original dataset size is {helper.computeSize(data, []).columns}x
        {helper.computeSize(data, []).rows}
      </p>
      <p>
        Current dataset size is{' '}
        {helper.computeSize(currentStateData, columnsToFilter).columns}x
        {helper.computeSize(currentStateData, columnsToFilter).rows}
      </p>
      <div>
        <button onClick={() => helper.download(currentStateData)}>
          Download
        </button>
      </div>
    </StyledContainer>
  );
};

export default Displayer;
