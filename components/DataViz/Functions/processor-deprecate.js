// https://mathjs.org/docs/core/configuration.html
// use evaluate
import {
  atan2,
  chain,
  derivative,
  e,
  evaluate,
  log,
  pi,
  pow,
  round,
  sqrt,
} from 'mathjs';

// https://simplestatistics.org/
import * as ss from 'simple-statistics';
// https://lodash.com/docs/4.17.15
import _ from 'lodash';
// https://medium.com/@pbesh/react-and-vega-an-alternative-visualization-example-cd76e07dc1cd#.omslw1xy8
// import vg from 'vega';

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
    console.log('operation', operation);
    const { parameters } = operation;

    if (parameters) {
      // filtering
      if (operation.type === 'FILTER') {
        if (parameters.operator === 'equal') {
          processedData = processedData.filter(
            line => line[parameters.column] === parameters.value
          );
        }
        if (parameters.operator === 'nonequal') {
          processedData = processedData.filter(
            line => line[parameters.column] !== parameters.value
          );
        }
      }

      // transformation
      if (operation.type === 'TRANSFORM') {
        processedData = processedData.map(line => {
          // check if there is a value exists
          if (line[parameters.column]) {
            // parse float from the value (produces NaN in case of a string)
            const originValue = parseFloat(line[parameters.column]);
            line[parameters.name] = evaluate(
              `${originValue} ${parameters.operator} ${parameters.value}`
            );
          }
          return line;
        });
      }

      // aggregation
      if (operation.type === 'AGGREGATE') {
        // debugger;
        // processedData = processedData.map(line => {
        //   console.log('line', line);
        // });
      }

      // const trial = ss.mean([0, 10]);
      // console.log('trial', trial);
      //
      // console.log('processedData', processedData);
    }
  });

  return processedData;
};

const Processor = {
  processData,
};

export default Processor;
