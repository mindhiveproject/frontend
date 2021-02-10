import React, { useState } from 'react';
import OperationFunctions from '../Functions/operations';

// https://vega.github.io/vega/docs/transforms/aggregate/

// selects and edit filters (its parameters) and change it in the pipeline
const AggregateArea = ({
  currentStateData,
  activeOperationPosition,
  updateState,
  operation,
  helper,
  transformPipe,
}) => {
  // Declare a new state variable, which we'll call "count"
  const [field, setColumn] = useState('');
  React.useEffect(() => {
    setColumn(operation?.parameters?.aggregate[0]?.field || '');
  }, [operation]);

  const [op, setOp] = useState('mean');
  React.useEffect(() => {
    setOp(operation?.parameters?.aggregate[0]?.op || 'mean');
  }, [operation]);

  const [groupby, setGroupby] = useState('');
  React.useEffect(() => {
    setGroupby(operation?.parameters?.groupby[0] || '');
  }, [operation]);

  const [as, setAs] = useState('');
  React.useEffect(() => {
    setAs(operation?.parameters?.aggregate[0]?.as || '');
  }, [operation]);

  // https://vega.github.io/vega-lite/docs/aggregate.html#ops
  const [operators] = React.useState([
    { label: 'Mean', value: 'mean' },
    { label: 'Median', value: 'median' },
    { label: 'Sum', value: 'sum' },
    { label: 'Variance', value: 'variance' },
    { label: 'Minimum value', value: 'min' },
    { label: 'Maximum value', value: 'max' },
    { label: 'Count of valid', value: 'valid' },
    { label: 'Count', value: 'count' },
  ]);

  const header = 'Aggregate Area';

  return (
    <div>
      <h3>{header}</h3>
      <div>
        <p>
          <label>
            Select field
            <select value={field} onChange={e => setColumn(e.target.value)}>
              {['', ...helper.getColumnNames(currentStateData)].map(
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
            <select value={op} onChange={e => setOp(e.target.value)}>
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
            Select grouping field
            <select value={groupby} onChange={e => setGroupby(e.target.value)}>
              {['', ...helper.getColumnNames(currentStateData)].map(
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
            Enter the new variable name
            <input
              type="text"
              value={as}
              onChange={e => setAs(e.target.value)}
            />
          </label>
        </p>
      </div>
      <button
        onClick={() =>
          OperationFunctions.addAggregateOperation(
            transformPipe,
            activeOperationPosition,
            {
              field,
              op,
              groupby,
              as,
            },
            updateState
          )
        }
      >
        Add
      </button>
    </div>
  );
};

export default AggregateArea;
