import { request, gql } from 'graphql-request';
import { STUDY_RESULTS_QUERY } from '../components/Study/Results/index';
import { endpoint, prodEndpoint } from '../config';

// const axios = require('axios');
const LZUTF8 = require('lzutf8');

exports.handler = async (event, context) => {
  const serverUrl =
    process.env.NODE_ENV === 'production' ? prodEndpoint : endpoint;
  const { study } = event.queryStringParameters;

  console.log('study', study);
  // define query variables
  const variables = {
    slug: study,
  };
  // console.log('serverUrl', serverUrl);

  const allRequestedData = await request(
    serverUrl,
    STUDY_RESULTS_QUERY,
    variables
  );
  const { studyResults } = allRequestedData;
  // console.log(studyResults);

  // const data = studyResults
  //   .map(result => {
  //     let data;
  //     const fullContent = result.fullData?.content;
  //     const incrementalContent =
  //       result.incrementalData.length &&
  //       result.incrementalData.map(d => d.content);
  //     if (fullContent) {
  //       data = JSON.parse(
  //         LZUTF8.decompress(fullContent, {
  //           inputEncoding: 'StorageBinaryString',
  //         })
  //       );
  //     }
  //     if (!fullContent && incrementalContent && incrementalContent.length) {
  //       data = incrementalContent
  //         .map(p =>
  //           JSON.parse(
  //             LZUTF8.decompress(p, {
  //               inputEncoding: 'StorageBinaryString',
  //             })
  //           )
  //         )
  //         .reduce((total, amount) => total.concat(amount), []);
  //     }
  //
  //     const resultData = data.map(line => {
  //       line.participantId = result.user && result.user.publicId;
  //       line.task = result.task && result.task.title;
  //       line.study = result.study && result.study.title;
  //       line.dataType = fullContent ? 'complete' : 'incremental';
  //       return line;
  //     });
  //     return resultData;
  //   })
  //   .reduce((a, b) => a.concat(b), []);

  // const fullContent = results.studyResults[0].fullData.content;

  // decode data
  // const data = JSON.parse(
  //   LZUTF8.decompress(fullContent, {
  //     inputEncoding: 'StorageBinaryString',
  //   })
  // );

  // https://jun711.github.io/aws/handling-aws-api-gateway-and-lambda-413-error/

  // the only problem with 6mb limit is here ⬇️

  // send data
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: JSON.stringify({
      data: 'OK',
    }),
  };

  // const data = JSON.stringify({
  //   // query: STUDY_RESULTS_QUERY,
  //   operationName: 'studyResults',
  //   variables: {
  //     where: { id: 'ckhknrz499jg90921gmgxqeml' },
  //   },
  // });
  // console.log('data', data);
  //
  // const response = await axios({
  //   method: 'GET',
  //   url: `${serverUrl}?${data}`,
  // });

  // console.log('response', response);

  // return {
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //   },
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     data: response.data,
  //   }),
  // };
};
