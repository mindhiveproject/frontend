import { SUBMIT_RESULTS_FROM_API_MUTATION } from './save';

const handler = async (req, res) => {
  console.log('request headers', req.headers);
  console.log('request body', req.body);
  // console.log('request method', req.method);
  // console.log('request body', req.body);
  console.log('request query', req.query); // The url query string
  // console.log('request cookies', req.cookies); // The passed cookies
  const { method } = req;
  switch (method) {
    case 'GET':
      // handleGet()
      break;
    case 'POST':
      // handlePost()
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }

  // send post request to the server
  const result = await fetch(`http://localhost:4444/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: SUBMIT_RESULTS_FROM_API_MUTATION,
      operationName: 'submitResultFromAPI',
      variables: {
        userId: 'ck8n2zd549xxs0a87l2fq7deu',
        experimentId: 'ck9zvanzzabej09188y2hbbdh',
        customExperimentId: 'ckaf6a1tenpjy09921nxffenh',
        data: [],
        metadata: {
          id: 'some-qualtrics-id',
          payload: 'full',
        },
        dataPolicy: 'science',
      },
    }),
  });
  const resJson = await result.json();
  console.log('resJson', resJson);

  return res.json(resJson);
};

export default handler;
