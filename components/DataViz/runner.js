import React from 'react';

import Processor from './Functions/processor';
import Helper from './Functions/helper';
import Displayer from './displayer';

import SpecEditor from './Components/SpecEditor';

// suppose to run things and put together everything with which users can interact

const Runner = ({
  data,
  columnsToFilter,
  updateState,
  activeOperationPosition,
  transformPipe,
  spec,
}) => {
  const header = 'Runner';

  // transform the data into the current state
  const currentStateData = Processor.processData(data, columnsToFilter);

  return (
    <>
      <h1>{header}</h1>
      <div>
        <button onClick={() => Helper.download(currentStateData)}>
          Download
        </button>
      </div>
      <SpecEditor spec={spec} updateState={updateState} />
      <Displayer
        data={data}
        currentStateData={currentStateData}
        columnsToFilter={columnsToFilter}
        updateState={updateState}
        helper={Helper}
        activeOperationPosition={activeOperationPosition}
        transformPipe={transformPipe}
        spec={spec}
      />
    </>
  );
};

export default Runner;
