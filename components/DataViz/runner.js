import React from 'react';

import Processor from './Functions/processor';
import Helper from './Functions/helper';
import Displayer from './displayer';

// suppose to run things and put together everything with which users can interact

const Runner = ({
  data,
  columnsToFilter,
  updateState,
  pipeline,
  activeOperationPosition,
}) => {
  const header = 'Runner';

  // transform the data into the current state
  const currentStateData = Processor.processData(
    data,
    columnsToFilter,
    pipeline
  );

  return (
    <>
      <h1>{header}</h1>
      <div>
        <button onClick={() => Helper.download(currentStateData)}>
          Download
        </button>
      </div>
      <Displayer
        data={data}
        currentStateData={currentStateData}
        columnsToFilter={columnsToFilter}
        updateState={updateState}
        helper={Helper}
        pipeline={pipeline}
        activeOperationPosition={activeOperationPosition}
      />
    </>
  );
};

export default Runner;
