const axios = require('axios');

exports.handler = async (event, context) => {
  const response = await axios.get(
    'https://samply.uni-konstanz.de/api/studies'
  );

  // "event" has information about the path, body, headers, etc. of the request
  console.log('event', event);
  // "context" has information about the lambda environment and user details
  console.log('context', context);
  // The "callback" ends the execution of the function and returns a response back to the caller

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: JSON.stringify({
      data: response.data,
    }),
  };
};
