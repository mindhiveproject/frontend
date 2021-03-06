import { SUBMIT_RESULTS_FROM_API_MUTATION } from '../pages/api/save';
import { endpoint, prodEndpoint } from '../config';

const axios = require('axios');

exports.handler = async (event, context) => {
  const { user, experiment, custom, policy } = event.queryStringParameters;
  console.log(
    'user, experiment, custom, policy',
    user,
    experiment,
    custom,
    policy
  );
  const { metadata, url, data } = JSON.parse(event.body);
  const dataString = JSON.stringify(data);
  console.log('dataString', dataString);

  const response = await axios({
    method: 'post',
    url: process.env.NODE_ENV === 'production' ? prodEndpoint : endpoint,
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
        customExperimentId: custom === 'undefined' ? null : custom,
        data,
        dataString,
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
