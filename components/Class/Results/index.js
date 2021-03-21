import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Head from 'next/head';
import styled from 'styled-components';
import Error from '../../ErrorMessage/index';
import ResultLine from './line';

const StyledResults = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  width: 90%;
`;

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
        publicId
      }
      quantity
      data
      createdAt
      updatedAt
      fullData {
        id
        content
      }
      incrementalData {
        id
        content
      }
    }
  }
`;

class ClassResults extends Component {
  render() {
    return (
      <StyledResults>
        <Query query={MY_CLASS_RESULTS_QUERY} variables={{ id: this.props.id }}>
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading</p>;
            if (!data.myClassResults)
              return <p>No class found for {this.props.id}</p>;
            const { myClassResults } = data;
            if (myClassResults.length === 0) {
              return (
                <div>
                  <h1>No results yet</h1>
                </div>
              );
            }
            return myClassResults.map(result => (
              <ResultLine key={result.id} result={result} />
            ));
          }}
        </Query>
      </StyledResults>
    );
  }
}

export default ClassResults;
export { MY_CLASS_RESULTS_QUERY };
