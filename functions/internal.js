import { SUBMIT_RESULTS_FROM_API_MUTATION } from '../pages/api/save';

const axios = require('axios');

exports.handler = async (event, context) => {
  const { user, template, task, policy } = event.queryStringParameters;
  console.log(
    'internal user, template, task, policy',
    user,
    template,
    task,
    policy
  );
  const { metadata, url, data } = JSON.parse(event.body);

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
        templateId: template,
        taskId: task === 'undefined' ? null : task,
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
