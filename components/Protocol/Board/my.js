import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Link from 'next/link';

import { StyledBoard, List, NavigationButtons } from '../../Styles/Boards';

import ProtocolCard from './card';

import Navigation from '../navigation';

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
        <Navigation tab={this.props.tab} />
        <Query query={MY_PROTOCOLS_QUERY}>
          {({ data, error, loading }) => {
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
