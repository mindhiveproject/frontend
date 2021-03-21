import withApollo from 'next-with-apollo';

// import { WebSocketLink } from '@apollo/client/link/ws';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from 'apollo-link-error';
// import { SubscriptionClient } from 'subscriptions-transport-ws';

// import ws from 'websocket';
import { endpoint, prodEndpoint } from '../config';
// import { LOCAL_STATE_QUERY } from '../components/Cart';

const httpLink = new HttpLink({
  uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
});

// Create a WebSocket link
// const wsLink = process.browser
//   ? new WebSocketLink({
//       uri: process.env.NODE_ENV === 'development' ? wsEndpoint : wsProdEndpoint,
//       options: {
//         reconnect: true,
//       },
//       webSocketImpl: ws.client,
//     })
//   : null;

// const link = process.browser
//   ? split(
//       ({ query }) => {
//         const { kind, operation } = getMainDefinition(query);
//         return kind === 'OperationDefinition' && operation === 'subscription';
//       },
//       wsLink,
//       httpLink
//     )
//   : httpLink;

const request = async (operation, headers) => {
  operation.setContext({
    fetchOptions: {
      credentials: 'include',
    },
    headers,
  });
};

const requestLink = headers =>
  new ApolloLink((operation, forward) => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include',
      },
      headers: { ...headers },
    });
    return forward(operation);
  });

const cache = new InMemoryCache();
// cache.writeQuery({
//   query: LOCAL_STATE_QUERY,
//   data: {
//     dashboardOpen: false,
//   },
// });

function createClient({ headers, initialState }) {
  return new ApolloClient({
    cache,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          console.log('graphQLErrors', graphQLErrors);
        }
        if (networkError) {
          console.log('Network error', networkError);
        }
      }),
      requestLink(headers),
      httpLink,
    ]),
    resolvers: {
      Mutation: {
        // toggleDashboard: (_root, variables, { cache }) => {
        //   const { dashboardOpen } = cache.readQuery({
        //     query: LOCAL_STATE_QUERY,
        //   });
        //   const data = { dashboardOpen: !dashboardOpen };
        //   cache.writeQuery({
        //     query: LOCAL_STATE_QUERY,
        //     data,
        //   });
        //   return data;
        // },
      },
    },
  });
}

export default withApollo(createClient);
