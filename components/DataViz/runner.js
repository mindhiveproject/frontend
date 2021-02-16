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
  onDatasetTypeChange,
  datasetType,
}) => {
  const header = 'Runner';

  // transform the data into the current state
  const currentStateData = Processor.processData(data, columnsToFilter);

  return (
    <Displayer
      data={currentStateData} // put the pre-processed data
      transformedData={transformedData}
      updateState={updateState}
      updateSpec={updateSpec}
      helper={Helper}
      activeTransformationPosition={activeTransformationPosition}
      spec={spec}
      onDatasetTypeChange={onDatasetTypeChange}
      datasetType={datasetType}
    />
  );
};

export default Runner;
