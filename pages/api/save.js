import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SUBMIT_RESULTS_FROM_API_MUTATION = gql`
  mutation submitResultFromAPI(
    $userId: ID!
    $experimentId: ID!
    $customExperimentId: ID
    $data: Json
    $metadata: Json
    $dataPolicy: String
  ) {
    submitResultFromAPI(
      userId: $userId
      experimentId: $experimentId
      customExperimentId: $customExperimentId
      data: $data
      metadata: $metadata
      dataPolicy: $dataPolicy
    ) {
      id
      quantity
    }
  }
`;

// https://levelup.gitconnected.com/a-guide-to-next-js-api-routes-a287eda1f784
// method POST
// https://www.apollographql.com/docs/apollo-server/v1/requests/
const handler = async (req, res) => {
  console.log('metadata', req.body.metadata);
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
        userId: req.query.user,
        experimentId: req.query.exp,
        customExperimentId: req.query.custom,
        data: req.body.data,
        metadata: req.body.metadata,
        dataPolicy: 'science',
      },
    }),
  });
  const resJson = await result.json();
  // console.log('resJson', resJson);

  return res.json(resJson);
};
export default handler;
export { SUBMIT_RESULTS_FROM_API_MUTATION };
