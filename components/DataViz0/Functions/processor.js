// process the data and transform it into the current state
const processData = (data, columnsToFilter) => {
  const processedData = JSON.parse(JSON.stringify(data)); // TODO: improve it with lodash later

  // 1. Filter out not selected columns
  processedData.map(line => {
    columnsToFilter.map(column => delete line[column]);
    return line;
  });

  return processedData;
};

const Processor = {
  processData,
};

export default Processor;
