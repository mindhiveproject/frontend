// process the data and transform it into the current state
const processData = (data, columnsToFilter, pipeline) => {
  let processedData = JSON.parse(JSON.stringify(data)); // TODO: improve it with lodash later

  // 1. Filter out not selected columns
  processedData.map(line => {
    columnsToFilter.map(column => delete line[column]);
    return line;
  });

  // 2. Apply pipeline operations
  // console.log('pipeline', pipeline);
  pipeline.map(operation => {
    // test for filtering
    const { parameters } = operation;
    if (parameters) {
      processedData = processedData.filter(
        line => line[parameters.column] === parameters.value
      );
      console.log('processedData', processedData);
    }
  });

  return processedData;
};

const Processor = {
  processData,
};

export default Processor;
