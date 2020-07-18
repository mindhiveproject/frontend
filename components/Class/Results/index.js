import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Error from '../../ErrorMessage/index';
import ResultLine from './line';

const MY_CLASS_RESULTS_QUERY = gql`
  query MY_CLASS_RESULTS_QUERY($id: ID!) {
    myClassResults(where: { id: $id }) {
      id
      study {
        id
        title
      }
      task {
        id
        title
      }
      user {
        id
        username
      }
      quantity
      data
      createdAt
      updatedAt
    }
  }
`;

class ClassResults extends Component {
  render() {
    return (
      <Query query={MY_CLASS_RESULTS_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.myClassResults)
            return <p>No class found for {this.props.id}</p>;
          const { myClassResults } = data;
          return myClassResults.map(result => (
            <ResultLine key={result.id} result={result} />
          ));
        }}
      </Query>
    );
  }
}

export default ClassResults;
export { MY_CLASS_RESULTS_QUERY };
