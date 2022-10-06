import React from 'react';
import styled from 'styled-components';
import Table from './Table';

const StyledArea = styled.div`
  display: grid;
  align-content: baseline;
`;

const StyledTableArea = styled.div`
  display: grid;
  width: 100%;
  height: 65vh;
  overflow: scroll;
`;

const StyledColumnNamesList = styled.div`
  display: grid;
  margin: 3px;
  padding: 5px;
  grid-template-columns: 1fr auto auto;
  grid-gap: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  color: ${props => (props.empty ? 'lightgrey' : 'black')};
  .infoIcon {
    cursor: pointer;
  }
`;

const StyledDatasetHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-gap: 2rem;
  align-items: center;
  margin: 2rem 0rem;
`;

const StyledSwitch = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  align-items: center;
  justify-items: center;
`;

const StyledOperationThumb = styled.div`
  padding: 10px;
  width: 100%;
  text-align: center;
  margin: 5px;
  border: 1px solid grey;
  align-items: center;
  cursor: pointer;
  background: ${props => (props.active ? '#007c70' : 'white')};
  color: ${props => (props.active ? 'white' : 'black')};
`;

// display the processed data in currentStateData
const ColumnNamesList = ({
  dataRaw,
  data,
  transformedData,
  updateState,
  helper,
  datasetType,
  onDatasetTypeChange,
}) => {
  const header = 'Dataset';
  const rawDataHeader = 'Raw data';
  const originalColumns = helper.getColumnNames(data);
  const transformeColumns = helper.getColumnNames(transformedData);
  const newColumns = transformeColumns.filter(
    column => !originalColumns.includes(column)
  );
  const columnNames = [...originalColumns, ...newColumns].sort();

  const tableColumns = React.useMemo(
    () =>
      columnNames
        .filter(column => !!column)
        .map(column => ({
          Header: column,
          accessor: column,
        })),
    [columnNames]
  );

  const tableData = React.useMemo(() => [...transformedData], [
    transformedData,
  ]);

  return (
    <StyledArea>
      <StyledSwitch>
        <StyledOperationThumb
          className="selectionBtns"
          active={datasetType === 'raw'}
          onClick={() => onDatasetTypeChange('raw')}
        >
          Data
        </StyledOperationThumb>

        <StyledOperationThumb
          className="selectionBtns"
          active={datasetType === 'participant'}
          onClick={() => onDatasetTypeChange('participant')}
        >
          By participant
        </StyledOperationThumb>
        {false && (
          <StyledOperationThumb
            className="selectionBtns"
            active={datasetType === 'aggregated'}
            onClick={() => onDatasetTypeChange('aggregated')}
          >
            By task
          </StyledOperationThumb>
        )}
      </StyledSwitch>
      <StyledDatasetHeader>
        <h4>{header}</h4>
        <span>
          {helper.computeSize(transformedData, []).columns} columns x{` `}
          {helper.computeSize(transformedData, []).rows} rows
        </span>
        <div>
          <button onClick={() => helper.download(transformedData)}>
            Download
          </button>
        </div>
      </StyledDatasetHeader>

      <StyledTableArea>
        <Table columns={tableColumns} data={tableData} />
      </StyledTableArea>
    </StyledArea>
  );
};

export default ColumnNamesList;

// {false && (
//   <StyledDatasetHeader>
//     <h4>{rawDataHeader}</h4>
//     <span>
//       {helper.computeSize(dataRaw, []).columns} columns x{` `}
//       {helper.computeSize(dataRaw, []).rows} rows
//     </span>
//     <div>
//       <button onClick={() => helper.download(dataRaw)}>
//         Download raw data
//       </button>
//     </div>
//   </StyledDatasetHeader>
// )}

// {false && (
//   <>
//     {columnNames.map((name, i) => {
//       // get the length of values and length of unique values for the column
//       const {
//         valuesLength,
//         uniqueValuesLength,
//       } = helper.computeColumnValuesSize(transformedData, name);
//       return (
//         <StyledColumnNamesList empty={valuesLength === 0} key={i}>
//           <label htmlFor={name}>{name}</label>
//           <label>
//             {valuesLength} ({uniqueValuesLength})
//           </label>
//           <span
//             className="infoIcon"
//             onClick={() =>
//               helper.getColumnValues(transformedData, name, true)
//             }
//           >
//             ℹ️
//           </span>
//         </StyledColumnNamesList>
//       );
//     })}
//   </>
// )}
