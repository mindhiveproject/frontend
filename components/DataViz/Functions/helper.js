import { jsonToCSV } from 'react-papaparse';

// download the current state of the data as a csv file
const download = data => {
  const name = 'temp-name';
  const allKeys = data
    .map(line => Object.keys(line))
    .reduce((a, b) => a.concat(b), []);
  const keys = Array.from(new Set(allKeys));
  const csv = jsonToCSV({ fields: keys, data });
  const blob = new Blob([csv], {
    type: 'text/csv',
  });
  saveAs(blob, `${name}.csv`);
};

// get all column names of the dataset
const getColumnNames = data => {
  const allKeys = data
    .map(line => Object.keys(line))
    .reduce((a, b) => a.concat(b), []);
  const keys = Array.from(new Set(allKeys)).sort();
  return keys;
};

// compute the size (columns x rows) of the current dataset
const computeSize = (data, columnsToFilter) => {
  const allKeys = data
    .map(line => Object.keys(line))
    .reduce((a, b) => a.concat(b), []);
  const keys = Array.from(new Set(allKeys)).filter(
    key => !columnsToFilter.includes(key)
  );
  const numberOfColumns = keys.length;
  const numberOfRows = data.length;
  return {
    rows: numberOfRows,
    columns: numberOfColumns,
  };
};

// add or remove the column name to the list of column names to filter
const filterColumn = (columnsToFilter, columnName, isRemove, updateState) => {
  let newColumns = [...columnsToFilter] || [];
  if (isRemove) {
    newColumns.push(columnName);
  } else {
    newColumns = newColumns.filter(name => name !== columnName);
  }
  updateState('columnsToFilter', newColumns);
};

// get the set of all column values in the dataset
const getColumnValues = (data, columnName, isAlert) => {
  const values = data.map(row => row[columnName]);
  const set = Array.from(new Set(values)).sort();
  // if the user needs to be alerted of values
  if (isAlert) {
    console.log('Unique values', set);
    alert(JSON.stringify(set));
  }
  return set;
};

// compute the size of the column (how many values? how many unique values?)
const computeColumnValuesSize = (data, columnName) => {
  const values = data.map(row => row[columnName]);
  const filteredValues = values.filter(
    value => typeof value !== 'undefined' && value !== ''
  );
  const valuesLength = filteredValues.length;
  const set = Array.from(new Set(filteredValues));
  const uniqueValuesLength = set.length;
  return {
    valuesLength,
    uniqueValuesLength,
  };
};

const Helper = {
  download,
  getColumnNames,
  computeSize,
  filterColumn,
  getColumnValues,
  computeColumnValuesSize,
};

export default Helper;
