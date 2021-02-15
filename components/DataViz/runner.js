import React from 'react';

import Processor from './Functions/processor';
import Helper from './Functions/helper';
import Displayer from './displayer';

// suppose to run things and put together everything with which users can interact

const Runner = ({
  data,
  transformedData,
  columnsToFilter,
  updateState,
  updateSpec,
  activeTransformationPosition,
  spec,
}) => {
  const header = 'Runner';

  // transform the data into the current state
  const currentStateData = Processor.processData(data, columnsToFilter);

  return (
    <Displayer
      data={data}
      transformedData={transformedData}
      currentStateData={currentStateData}
      columnsToFilter={columnsToFilter}
      updateState={updateState}
      updateSpec={updateSpec}
      helper={Helper}
      activeTransformationPosition={activeTransformationPosition}
      spec={spec}
    />
  );
};

export default Runner;
