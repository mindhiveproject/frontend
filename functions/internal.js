import { SUBMIT_RESULTS_FROM_API_MUTATION } from '../pages/api/save';
import { endpoint, prodEndpoint } from '../config';

const axios = require('axios');
const pako = require('pako');

exports.handler = async (event, context) => {
  // const serverUrl = endpoint;
  // console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  const serverUrl =
    process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint;
  const { user, template, task, study, policy } = event.queryStringParameters;

  const { metadata, url, data } = JSON.parse(event.body);

  const dataRawString = JSON.stringify(data);
  const dataString = pako.deflate(dataRawString, { to: 'string' });

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
