import React, { useState } from 'react';
import styled from 'styled-components';
import OperationFunctions from '../Functions/operations';

const StyledSelectorLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  align-items: baseline;
`;

// selects and edit filters (its parameters) and change it in the pipeline
const DisplayArea = ({
  data,
  transformedData,
  updateState,
  updateSpec,
  operation,
  helper,
  spec,
  activeTransformationPosition,
}) => {
  // X variable
  const [encoding_X_field, setEncoding_X_field] = useState('');
  React.useEffect(() => {
    setEncoding_X_field(spec?.encoding?.x?.field || '');
  }, [spec]);

  // X variable type
  const [encoding_X_type, setEncoding_X_type] = useState('ordinal');
  React.useEffect(() => {
    setEncoding_X_type(spec?.encoding?.x?.type || 'ordinal');
  }, [spec]);

  // X variable aggregate
  const [encoding_X_aggregate, setEncoding_X_aggregate] = useState('');
  React.useEffect(() => {
    setEncoding_X_aggregate(spec?.encoding?.x?.aggregate || '');
  }, [spec]);

  // X variable aggregate
  const [encoding_X_bin, setEncoding_X_bin] = useState(false);
  React.useEffect(() => {
    setEncoding_X_aggregate(spec?.encoding?.x?.bin || false);
  }, [spec]);

  // Y variable
  const [encoding_Y_field, setEncoding_Y_field] = useState('');
  React.useEffect(() => {
    setEncoding_Y_field(spec?.encoding?.y?.field || '');
  }, [spec]);

  // Y variable type
  const [encoding_Y_type, setEncoding_Y_type] = useState('quantitative');
  React.useEffect(() => {
    setEncoding_Y_type(spec?.encoding?.y?.type || 'quantitative');
  }, [spec]);

  // X variable aggregate
  const [encoding_Y_aggregate, setEncoding_Y_aggregate] = useState('');
  React.useEffect(() => {
    setEncoding_Y_aggregate(spec?.encoding?.y?.aggregate || '');
  }, [spec]);

  // type of the graph (mark)
  const [mark, setMark] = useState('bar');
  React.useEffect(() => {
    setMark(spec?.mark || 'bar');
  }, [spec]);

  // Detail variable
  const [encoding_Detail_field, setEncoding_Detail_field] = useState('');
  React.useEffect(() => {
    setEncoding_Detail_field(spec?.encoding?.detail?.field || '');
  }, [spec]);

  // Color variable
  const [encoding_Color_field, setEncoding_Color_field] = useState('');
  React.useEffect(() => {
    setEncoding_Color_field(spec?.encoding?.color?.field || '');
  }, [spec]);

  // Color variable type
  const [encoding_Color_type, setEncoding_Color_type] = useState('nominal');
  React.useEffect(() => {
    setEncoding_Color_type(spec?.encoding?.color?.type || 'nominal');
  }, [spec]);

  // https://vega.github.io/vega-lite/docs/aggregate.html#ops
  const [marks] = React.useState([
    { label: 'Bar plot', value: 'bar' },
    { label: 'Points', value: 'point' },
    { label: 'Area', value: 'area' },
    { label: 'Circle', value: 'circle' },
    { label: 'Line', value: 'line' },
    { label: 'Rect', value: 'rect' },
    { label: 'Rule', value: 'rule' },
    { label: 'Square', value: 'square' },
    // { label: 'text', value: 'text' },
    { label: 'Tick', value: 'tick' },
    // { label: 'geoshape', value: 'geoshape' },
  ]);

  const [aggregationOperations] = React.useState([
    { label: 'No aggregation', value: '' },
    { label: 'Mean', value: 'mean' },
    { label: 'Median', value: 'median' },
    { label: 'Sample variance', value: 'variance' },
    { label: 'Sample standard deviation', value: 'stdev' },
    { label: 'Min value', value: 'min' },
    { label: 'Max value', value: 'max' },
    { label: 'Sum', value: 'sum' },
    { label: 'Count', value: 'count' },
    { label: 'Count of valid values', value: 'valid' },
    { label: 'Count of missing values', value: 'missing' },
  ]);

  const header = 'Display Parameters';

  const originalColumns = helper.getColumnNames(data);
  const transformeColumns = helper.getColumnNames(transformedData);
  const newColumns = transformeColumns.filter(
    column => !originalColumns.includes(column)
  );
  const databaseColumns = [...originalColumns, ...newColumns];

  return (
    <div>
      <h3>{header}</h3>

      <div>
        <label>
          <select value={mark} onChange={e => setMark(e.target.value)}>
            {marks.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <StyledSelectorLine>
        <p>Select X variable</p>
        <select
          value={encoding_X_field}
          onChange={e => setEncoding_X_field(e.target.value)}
        >
          {['', ...databaseColumns].map((value, num) => (
            <option key={num} value={value}>
              {value}
            </option>
          ))}
        </select>
        <p>Select type of X variable</p>
        <select
          value={encoding_X_type}
          onChange={e => setEncoding_X_type(e.target.value)}
        >
          {['nominal', 'ordinal', 'quantitative', 'temporal'].map(
            (value, num) => (
              <option key={num} value={value}>
                {value}
              </option>
            )
          )}
        </select>
        <p>Select type of X aggregate</p>
        <select
          value={encoding_X_aggregate}
          onChange={e => setEncoding_X_aggregate(e.target.value)}
        >
          {aggregationOperations.map((value, num) => (
            <option key={num} value={value.value}>
              {value.label}
            </option>
          ))}
        </select>
        <p>Is histogram?</p>
        <input
          type="checkbox"
          checked={encoding_X_bin}
          onChange={e => setEncoding_X_bin(!encoding_X_bin)}
        />
      </StyledSelectorLine>

      <StyledSelectorLine>
        <p>Select Y variable</p>
        <select
          value={encoding_Y_field}
          onChange={e => setEncoding_Y_field(e.target.value)}
        >
          {['', ...databaseColumns].map((value, num) => (
            <option key={num} value={value}>
              {value}
            </option>
          ))}
        </select>
        <p>Select type of Y variable</p>
        <select
          value={encoding_Y_type}
          onChange={e => setEncoding_Y_type(e.target.value)}
        >
          {['nominal', 'ordinal', 'quantitative', 'temporal'].map(
            (value, num) => (
              <option key={num} value={value}>
                {value}
              </option>
            )
          )}
        </select>
        <p>Select type of Y aggregate</p>
        <select
          value={encoding_Y_aggregate}
          onChange={e => setEncoding_Y_aggregate(e.target.value)}
        >
          {aggregationOperations.map((value, num) => (
            <option key={num} value={value.value}>
              {value.label}
            </option>
          ))}
        </select>
      </StyledSelectorLine>

      <StyledSelectorLine>
        <p>Select Detail variable</p>
        <select
          value={encoding_Detail_field}
          onChange={e => setEncoding_Detail_field(e.target.value)}
        >
          {['', ...databaseColumns].map((value, num) => (
            <option key={num} value={value}>
              {value}
            </option>
          ))}
        </select>
      </StyledSelectorLine>

      <StyledSelectorLine>
        <p>Select Color variable</p>
        <select
          value={encoding_Color_field}
          onChange={e => setEncoding_Color_field(e.target.value)}
        >
          {['', ...databaseColumns].map((value, num) => (
            <option key={num} value={value}>
              {value}
            </option>
          ))}
        </select>
        <p>Select type of Color variable</p>
        <select
          value={encoding_Color_type}
          onChange={e => setEncoding_Color_type(e.target.value)}
        >
          {['nominal', 'ordinal', 'quantitative', 'temporal'].map(
            (value, num) => (
              <option key={num} value={value}>
                {value}
              </option>
            )
          )}
        </select>
      </StyledSelectorLine>

      <button
        onClick={() =>
          OperationFunctions.editDislaySpec(
            spec,
            {
              mark,
              encoding: {
                x: {
                  field: encoding_X_field,
                  type: encoding_X_type,
                  aggregate: encoding_X_aggregate,
                  bin: encoding_X_bin,
                },
                y: {
                  field: encoding_Y_field,
                  type: encoding_Y_type,
                  aggregate: encoding_Y_aggregate,
                },
                detail: {
                  field: encoding_Detail_field,
                },
                color: {
                  field: encoding_Color_field,
                  type: encoding_Color_type,
                },
              },
            },
            updateState
          )
        }
      >
        Update
      </button>
    </div>
  );
};

export default DisplayArea;
