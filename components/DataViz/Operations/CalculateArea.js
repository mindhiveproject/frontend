import React, { useState } from 'react';
import OperationFunctions from '../Functions/operations';

// selects and edit filters (its parameters) and change it in the pipeline
const CalculateArea = ({
  currentStateData,
  activeOperationPosition,
  updateState,
  operation,
  helper,
  transformPipe,
}) => {
  const [calculate, setCalculate] = useState('');
  React.useEffect(() => {
    setCalculate(operation?.parameters?.calculate || '');
  }, [operation]);

  const [as, setAs] = useState('');
  React.useEffect(() => {
    setAs(operation?.parameters?.as || '');
  }, [operation]);

  const header = 'Calculate area';

  return (
    <div>
      <h3>{header}</h3>
      <div>
        <p>
          <label>
            Enter the formula (use "datum." in front of the name of variables)
            <input
              type="text"
              value={calculate}
              onChange={e => setCalculate(e.target.value)}
            />
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
          OperationFunctions.addCalculateOperation(
            transformPipe,
            activeOperationPosition,
            {
              calculate,
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

export default CalculateArea;
