import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Link from 'next/link';

import { StyledBoard, List, NavigationButtons } from '../../Styles/Boards';
import ProtocolCard from './card';

// write a query here, later refactor it in a separate file if it is used elsewhere
const ALL_PROTOCOLS_QUERY = gql`
  query ALL_PROTOCOLS_QUERY {
    consents {
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

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-@apollo/client/react/components-2-1-199e9e2bd01e
class AllStudies extends Component {
  render() {
    return (
      <StyledBoard>
        <h1>All protocols</h1>
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
        <Query query={ALL_PROTOCOLS_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <List>
                {data.consents.map(protocol => (
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

export default AllStudies;
export { ALL_PROTOCOLS_QUERY };
