import React, { useState } from 'react';
import OperationFunctions from '../Functions/operations';

// selects and edit filters (its parameters) and change it in the pipeline
const CalculateArea = ({
  currentStateData,
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

  const header = 'Calculate area';

  return (
    <div>
      <h3>{header}</h3>
      <div>
        <p>
          <label>
            <p>
              Enter the formula (use "datum." in front of the name of variables)
            </p>
            <input
              type="text"
              value={calculate}
              onChange={e => setCalculate(e.target.value)}
            />
          </label>
        </p>

        <p>
          <label>
            <p>Enter the new variable name</p>
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
        Add
      </button>
    </div>
  );
};

export default CalculateArea;
