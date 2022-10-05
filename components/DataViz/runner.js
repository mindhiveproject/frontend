import React from 'react';

import Processor from './Functions/processor';
import Helper from './Functions/helper';
import Displayer from './displayer';

// run things and put together everything for users to interact

const Runner = ({
  dataRaw,
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
  // transform the data into the current state
  const currentStateData = Processor.processData(data, columnsToFilter);
  const currentStateTransformedData = Processor.processData(
    transformedData,
    columnsToFilter
  );

  return (
    <Displayer
      dataRaw={dataRaw}
      data={currentStateData} // put the pre-processed data
      transformedData={currentStateTransformedData}
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
