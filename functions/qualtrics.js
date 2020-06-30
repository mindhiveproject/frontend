import { v1 as uuidv1 } from 'uuid';
import { SUBMIT_RESULTS_FROM_API_MUTATION } from '../pages/api/save';
import { endpoint, prodEndpoint } from '../config';

const axios = require('axios');

exports.handler = async (event, context) => {
  const serverUrl =
    process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint;
  const { user, template, task, study, policy } = event.headers;
  const data = JSON.parse(event.body);
  const metadata = {
    id: uuidv1(),
    payload: 'full',
  };

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
        userId: user === 'undefined' ? 'ckbqjjtjp00ha0725ubofklxo' : user,
        templateId: template === 'undefined' ? null : template,
        taskId: task === 'undefined' ? null : task,
        studyId: study === 'undefined' ? null : study,
        data,
        metadata,
        dataPolicy: policy,
      },
    }),
  });

  return {
    statusCode: response.status,
    body: response.statusText,
  };
};
