import React, { useState } from 'react';
import styled from 'styled-components';
import OperationFunctions from '../Functions/operations';

// https://vega.github.io/vega/docs/transforms/aggregate/

const StyledSelectorLine = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr;
  grid-gap: 10px;
  align-items: baseline;
  justif
`;

// selects and edit filters (its parameters) and change it in the pipeline
const DisplayArea = ({
  currentStateData,
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

  // type of the graph (mark)
  const [mark, setMark] = useState('bar');
  React.useEffect(() => {
    setMark(spec?.mark || 'bar');
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

  const header = 'Display Parameters';

  return (
    <div>
      <h3>{header}</h3>

      <div>
        <label>
          <p>Select type of the graph</p>
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
          {['', ...helper.getColumnNames(currentStateData)].map(
            (value, num) => (
              <option key={num} value={value}>
                {value}
              </option>
            )
          )}
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
      </StyledSelectorLine>

      <StyledSelectorLine>
        <p>Select Y variable</p>
        <select
          value={encoding_Y_field}
          onChange={e => setEncoding_Y_field(e.target.value)}
        >
          {['', ...helper.getColumnNames(currentStateData)].map(
            (value, num) => (
              <option key={num} value={value}>
                {value}
              </option>
            )
          )}
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
      </StyledSelectorLine>

      <button
        onClick={() =>
          OperationFunctions.editDislaySpec(
            spec,
            {
              mark,
              encoding: {
                x: { field: encoding_X_field, type: encoding_X_type },
                y: { field: encoding_Y_field, type: encoding_Y_type },
              },
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

export default DisplayArea;
