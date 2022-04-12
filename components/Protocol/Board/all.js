import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { StyledBoard, List, NavigationButtons } from '../../Styles/Boards';
import ProtocolCard from './card';

import Navigation from '../navigation';

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
        <Navigation tab={this.props.tab} />
        <Query query={ALL_PROTOCOLS_QUERY}>
          {({ data, error, loading }) => {
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
