import { SUBMIT_RESULTS_FROM_API_MUTATION } from '../pages/api/save';
import { endpoint, prodEndpoint } from '../config';

const axios = require('axios');

exports.handler = async (event, context) => {
  const serverUrl =
    process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint;
  const { user, template, task, study, policy } = event.queryStringParameters;
  console.log('serverUrl', serverUrl, process.env.NODE_ENV);
  console.log(
    'internal user, template, task, study, policy',
    user,
    template,
    task,
    study,
    policy
  );
  const { metadata, url, data } = JSON.parse(event.body);
  // console.log('study', study);

  const response = await axios({
    method: 'post',
    url: serverUrl,
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
        studyId: study === 'undefined' ? null : study,
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
