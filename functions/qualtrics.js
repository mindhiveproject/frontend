import { SUBMIT_RESULTS_FROM_API_MUTATION } from '../pages/api/save';
import { endpoint, prodEndpoint } from '../config';

const axios = require('axios');

exports.handler = async (event, context) => {
  // console.log('event', event);
  const serverUrl =
    process.env.NODE_ENV === 'development' ? endpoint : endpoint;
  const { user, template, task, study, policy } = event.headers;
  const data = JSON.parse(event.body);
  // console.log('data', data);

  console.log(
    'user, template, task, study, policy',
    user,
    template,
    task,
    study,
    policy
  );

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
        templateId: template === 'undefined' ? null : template,
        taskId: task === 'undefined' ? null : task,
        studyId: study === 'undefined' ? null : study,
        data,
        metadata: {
          id: '1234567',
          payload: 'full',
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
