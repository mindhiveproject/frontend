import React from 'react';
import styled from 'styled-components';

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
  grid-gap: 10px;
  align-items: center;
`;

const StyledSwitch = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  align-items: center;
  justify-items: center;
`;

const StyledOperationThumb = styled.div`
  padding: 10px;
  margin: 5px;
  border: 1px solid grey;
  align-items: center;
  cursor: pointer;
  background: ${props => (props.active ? '#007c70' : 'white')};
  color: ${props => (props.active ? 'white' : 'black')};
`;

// display the processed data in currentStateData
const ColumnNamesList = ({
  data,
  transformedData,
  updateState,
  helper,
  datasetType,
  onDatasetTypeChange,
}) => {
  const header = 'Dataset';
  const originalColumns = helper.getColumnNames(data);
  const transformeColumns = helper.getColumnNames(transformedData);
  const newColumns = transformeColumns.filter(
    column => !originalColumns.includes(column)
  );
  const columnNames = [...originalColumns, ...newColumns].sort();

  return (
    <div>
      <StyledSwitch>
        <StyledOperationThumb
          className="selectionBtns"
          active={datasetType === 'aggregated'}
          onClick={() => onDatasetTypeChange('aggregated')}
        >
          Aggregated
        </StyledOperationThumb>
        <StyledOperationThumb
          className="selectionBtns"
          active={datasetType === 'participant'}
          onClick={() => onDatasetTypeChange('participant')}
        >
          By participant
        </StyledOperationThumb>
        <StyledOperationThumb
          className="selectionBtns"
          active={datasetType === 'raw'}
          onClick={() => onDatasetTypeChange('raw')}
        >
          Raw data
        </StyledOperationThumb>
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

      {columnNames.map((name, i) => {
        // get the length of values and length of unique values for the column
        const {
          valuesLength,
          uniqueValuesLength,
        } = helper.computeColumnValuesSize(transformedData, name);
        return (
          <StyledColumnNamesList empty={valuesLength === 0} key={i}>
            <label htmlFor={name}>{name}</label>
            <label>
              {valuesLength} ({uniqueValuesLength})
            </label>
            <span
              className="infoIcon"
              onClick={() =>
                helper.getColumnValues(transformedData, name, true)
              }
            >
              ℹ️
            </span>
          </StyledColumnNamesList>
        );
      })}
    </div>
  );
};

export default ColumnNamesList;

// <input
//   type="checkbox"
//   name={name}
//   id={name}
//   checked={!isFiltered}
//   onChange={() =>
//     helper.filterColumn(
//       columnsToFilter,
//       name,
//       !isFiltered,
//       updateState
//     )
//   }
// />

// <p>
//   Original dataset size is {helper.computeSize(data, []).columns}x
//   {helper.computeSize(data, []).rows}
// </p>
