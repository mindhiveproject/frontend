import React, { useState } from 'react';
import styled from 'styled-components';
import OperationFunctions from '../Functions/operations';

const StyledCalculateArea = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

// selects and edit filters (its parameters) and change it in the pipeline
const CalculateArea = ({
  transformedData,
  updateSpec,
  operation,
  helper,
  spec,
  activeTransformationPosition,
}) => {
  const [calculate, setCalculate] = useState('');
  React.useEffect(() => {
    setCalculate(operation?.calculate || '');
  }, [operation]);

  const [as, setAs] = useState('');
  React.useEffect(() => {
    setAs(operation?.as || '');
  }, [operation]);

  const header = `${activeTransformationPosition + 1}) Calculate`;

  return (
    <StyledCalculateArea>
      <h3>{header}</h3>
      <div>
        <p>
          <label>
            Enter the formula (use{' '}
            <code>datum["the name of the variable"]</code> for a variable)
            <br />
            <textarea
              style={{ width: '100%', padding: '10px' }}
              value={calculate}
              rows="6"
              onChange={e => setCalculate(e.target.value)}
            />
          </label>
        </p>

        <p>
          <label>
            Enter the name for the new variable
            <br />
            <input
              style={{ width: '100%', padding: '10px' }}
              type="text"
              value={as}
              onChange={e => setAs(e.target.value)}
            />
          </label>
        </p>
      </div>
      <button
        onClick={() =>
          OperationFunctions.addCalculateOperation(
            spec,
            activeTransformationPosition,
            {
              calculate,
              as,
            },
            updateSpec
          )
        }
      >
        Update
      </button>
    </StyledCalculateArea>
  );
};

export default CalculateArea;
