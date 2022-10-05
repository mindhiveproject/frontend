import { useState } from 'react';
import styled from 'styled-components';

import { Button } from 'semantic-ui-react';
import SpecEditor from './Components/SpecEditor';
import ColumnNamesList from './Components/ColumnNamesList';
import WorkingDashboard from './Components/WorkingDashboard';

const StyledContainer = styled.div`
  margin: 20px;
  display: grid;
  align-content: baseline;
`;

const StyledDisplayer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  dataRaw,
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
  const header = 'Data Viz (version 0.1.0)';

  const [isDisplay, setIsDisplay] = useState(false);

  return (
    <StyledContainer>
      <h2>{header}</h2>

      <StyledDisplayer>
        <ColumnNamesList
          dataRaw={dataRaw}
          data={data}
          transformedData={transformedData}
          updateState={updateState}
          helper={helper}
          onDatasetTypeChange={onDatasetTypeChange}
          datasetType={datasetType}
        />

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

// {false && <SpecEditor spec={spec} updateState={updateState} />}
//
// <div>
//   {false && (
//     <Button
//       toggle
//       active={isDisplay}
//       onClick={() => setIsDisplay(!isDisplay)}
//     >
//       Data Viz
//     </Button>
//   )}
//
//   {isDisplay && (
//
//   )}
// </div>
