import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
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

const MY_STUDY_RESULTS_QUERY = gql`
  query MY_STUDY_RESULTS_QUERY($id: ID!) {
    myStudyResults(where: { id: $id }) {
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

class StudyResults extends Component {
  render() {
    return (
      <StyledResults>
        <Query query={MY_STUDY_RESULTS_QUERY} variables={{ id: this.props.id }}>
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading ... </p>;
            if (!data.myStudyResults)
              return <p>No study found for the id {this.props.id}</p>;
            const { myStudyResults } = data;
            if (myStudyResults.length === 0) {
              return (
                <div>
                  <h1>No results yet</h1>
                </div>
              );
            }
            return myStudyResults.map(result => (
              <ResultLine key={result.id} result={result} />
            ));
          }}
        </Query>
      </StyledResults>
    );
  }
}

export default StudyResults;
export { MY_STUDY_RESULTS_QUERY };
