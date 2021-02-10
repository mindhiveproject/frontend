import React from 'react';
import styled from 'styled-components';

const StyledColumnNamesList = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto 100px;
  grid-gap: 10px;
  border: 1px solid grey;
`;

// display the processed data in currentStateData
const ColumnNamesList = ({
  data,
  currentStateData,
  columnsToFilter,
  updateState,
  helper,
}) => {
  const header = 'ColumnNamesList';
  return (
    <div>
      <h1>{header}</h1>
      {helper.getColumnNames(data).map((name, i) => {
        const isFiltered = columnsToFilter.includes(name);
        // get the length of values and length of unique values for the column
        const {
          valuesLength,
          uniqueValuesLength,
        } = helper.computeColumnValuesSize(currentStateData, name);
        return (
          <StyledColumnNamesList key={i}>
            <input
              type="checkbox"
              name={name}
              id={name}
              checked={!isFiltered}
              onChange={() =>
                helper.filterColumn(
                  columnsToFilter,
                  name,
                  !isFiltered,
                  updateState
                )
              }
            />
            <label htmlFor={name}>{name}</label>
            <label>
              {valuesLength} ({uniqueValuesLength})
            </label>
            <button
              onClick={() => helper.getColumnValues(currentStateData, name)}
            >
              Values
            </button>
          </StyledColumnNamesList>
        );
      })}
    </div>
  );
};

export default ColumnNamesList;
