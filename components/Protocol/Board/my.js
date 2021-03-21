import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Link from 'next/link';

import { StyledBoard, List, NavigationButtons } from '../../Styles/Boards';

import ProtocolCard from './card';

// write a query here, later refactor it in a separate file if it is used elsewhere
const MY_PROTOCOLS_QUERY = gql`
  query MY_PROTOCOLS_QUERY {
    myConsents {
      id
      title
      slug
      author {
        id
      }
      collaborators {
        id
        username
      }
    }
  }
`;

class MyProtocols extends Component {
  render() {
    return (
      <StyledBoard>
        <h1>My IRB protocols</h1>
        <NavigationButtons>
          <Link
            href={{
              pathname: '/irb/add',
            }}
          >
            <a>
              <button>
                <h2>Add new protocol</h2>
              </button>
            </a>
          </Link>
          <Link
            href={{
              pathname: '/irb/my',
            }}
          >
            <a>
              <button>
                <h2>My IRB protocols</h2>
              </button>
            </a>
          </Link>
          <Link
            href={{
              pathname: '/irb/all',
            }}
          >
            <a>
              <button>
                <h2>All IRB protocols</h2>
              </button>
            </a>
          </Link>
        </NavigationButtons>
        <Query query={MY_PROTOCOLS_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <List>
                {data.myConsents &&
                  data.myConsents.map(protocol => (
                    <ProtocolCard protocol={protocol} key={protocol.id} />
                  ))}
              </List>
            );
          }}
        </Query>
      </StyledBoard>
    );
  }
}

export default MyProtocols;
export { MY_PROTOCOLS_QUERY };
