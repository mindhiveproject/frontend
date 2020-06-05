// exports.handler = (event, context, callback) => {
//   // "event" has information about the path, body, headers, etc. of the request
//   console.log('event', event);
//   // "context" has information about the lambda environment and user details
//   console.log('context', context);
//   // The "callback" ends the execution of the function and returns a response back to the caller
//   return callback(null, {
//     statusCode: 200,
//     body: JSON.stringify({
//       data: 'Data received from Qualtrics',
//     }),
//   });
// };

import { SUBMIT_RESULTS_FROM_API_MUTATION } from '../pages/api/save';

const axios = require('axios');

exports.handler = async (event, context) => {
  const { user, experiment, custom, policy } = event.queryStringParameters;
  const { metadata, url, data } = JSON.parse(event.body);

  console.log(
    'user, experiment, custom, policy',
    user,
    experiment,
    custom,
    policy
  );

  const response = await axios({
    method: 'post',
    url: 'http://localhost:4444/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      query: SUBMIT_RESULTS_FROM_API_MUTATION,
      operationName: 'submitResultFromAPI',
      variables: {
        userId: user,
        experimentId: experiment,
        customExperimentId: custom,
        data,
        metadata: {
          id: metadata.id,
          payload: metadata.payload,
        },
        dataPolicy: policy,
      },
    }),
  });

  return {
    statusCode: response.status,
    body: response.statusText,
  };
};
