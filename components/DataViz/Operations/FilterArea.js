import React, { useState } from 'react';
import OperationFunctions from '../Functions/operations';

// selects and edit filters (its parameters) and change it in the pipeline
const FilterArea = ({
  transformedData,
  updateSpec,
  operation,
  helper,
  spec,
  activeTransformationPosition,
}) => {
  // Declare a new state variable, which we'll call "count"
  const [field, setField] = useState('');
  React.useEffect(() => {
    setField(operation?.filter?.field || '');
  }, [operation]);

  const [predicate, setPredicate] = useState('equal');
  React.useEffect(() => {
    setPredicate(operation?.filter?.predicate || 'equal');
  }, [operation]);

  const [value, setValue] = useState('');
  React.useEffect(() => {
    setValue(operation?.filter?.value || '');
  }, [operation]);

  const [operators] = React.useState([
    { label: 'Equals', value: 'equal' },
    { label: 'Less than', value: 'lt' },
    { label: 'Less than or equals', value: 'lte' },
    { label: 'Greater than', value: 'gt' },
    { label: 'Greater than or equals', value: 'gte' },
    { label: 'In the range', value: 'range' },
    { label: 'One of', value: 'oneOf' },
    { label: 'Valid', value: 'valid' },
  ]);

  const header = `${activeTransformationPosition + 1}) Filter`;

  return (
    <div>
      <h3>{header}</h3>
      <div>
        <p>
          <label>
            Select column
            <select value={field} onChange={e => setField(e.target.value)}>
              {['', ...helper.getColumnNames(transformedData)].map(
                (value, num) => (
                  <option key={num} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
          </label>
        </p>
        <p>
          <label>
            Select operator
            <select
              value={predicate}
              onChange={e => setPredicate(e.target.value)}
            >
              {operators.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </p>
        <p>
          <label>
            Select value
            <select value={value} onChange={e => setValue(e.target.value)}>
              {field &&
                ['', ...helper.getColumnValues(transformedData, field)].map(
                  (value, num) => (
                    <option key={num} value={value}>
                      {JSON.stringify(value)}
                    </option>
                  )
                )}
            </select>
          </label>
        </p>
      </div>
      <button
        onClick={() =>
          OperationFunctions.addFilterOperation(
            spec,
            activeTransformationPosition,
            {
              field,
              predicate,
              value,
            },
            updateSpec
          )
        }
      >
        Update
      </button>
    </div>
  );
};

export default FilterArea;
