import React from 'react';
import styled from 'styled-components';

import ColumnNamesList from './Components/ColumnNamesList';
import WorkingDashboard from './Components/WorkingDashboard';

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
// ColumnNamesList: the column names on the left
// WorkingDashboard: working area on the right

const Displayer = ({
  data,
  currentStateData,
  columnsToFilter,
  updateState,
  helper,
  pipeline,
  activeOperationPosition,
}) => {
  const header = 'Displayer';
  return (
    <>
      <h1>{header}</h1>
      <p>
        Dataset size is {helper.computeSize(data, columnsToFilter).columns}x
        {helper.computeSize(data, columnsToFilter).rows}
      </p>
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
          columnsToFilter={columnsToFilter}
          updateState={updateState}
          helper={helper}
          pipeline={pipeline}
          activeOperationPosition={activeOperationPosition}
        />
      </StyledDisplayer>
    </>
  );
};

export default Displayer;
