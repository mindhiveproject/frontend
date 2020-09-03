import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Error from '../../ErrorMessage/index';
import ResultLine from './line';

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
        username
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
      <Query query={MY_STUDY_RESULTS_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.myStudyResults)
            return <p>No class found for {this.props.id}</p>;
          const { myStudyResults } = data;
          console.log('myStudyResults', myStudyResults);
          return myStudyResults.map(result => (
            <ResultLine key={result.id} result={result} />
          ));
        }}
      </Query>
    );
  }
}

export default StudyResults;
export { MY_STUDY_RESULTS_QUERY };
