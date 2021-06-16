import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

import Error from '../ErrorMessage/index';
import Router from './router';
import InDev from '../Development/Study/inDev';

const LZUTF8 = require('lzutf8');

const MY_STUDY_RESULTS_QUERY = gql`
  query MY_STUDY_RESULTS_QUERY($id: ID!) {
    myStudyResults(where: { id: $id }) {
      id
      study {
        id
        title
        components
      }
      task {
        id
        title
      }
      user {
        id
        publicId
        generalInfo
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
      testVersion
    }
  }
`;

class StudyResults extends Component {
  // takes in the raw data and merge it together
  // it can extract either incremental or full data (dependent on what is available)
  processRawData = results => {
    const allData = results
      .map(result => {
        let { data } = result;
        const fullContent = result.fullData?.content;
        const incrementalContent =
          result.incrementalData.length &&
          result.incrementalData.map(d => d.content);
        if (fullContent) {
          data = JSON.parse(
            LZUTF8.decompress(fullContent, {
              inputEncoding: 'StorageBinaryString',
            })
          );
        }
        if (!fullContent && incrementalContent && incrementalContent.length) {
          data = incrementalContent
            .map(p =>
              JSON.parse(
                LZUTF8.decompress(p, {
                  inputEncoding: 'StorageBinaryString',
                })
              )
            )
            .reduce((total, amount) => total.concat(amount), []);
        }
        // augment the raw data with participant information
        const resultData = data.map(line => {
          line.participantId = result.user && result.user.publicId;
          line.task = result.task && result.task.title;
          line.testVersion = result.testVersion && result.testVersion;
          line.study = result.study && result.study.title;
          line.dataType = fullContent ? 'complete' : 'incremental';
          return line;
        });
        return resultData;
      })
      .reduce((a, b) => a.concat(b), []);

    return allData;
  };

  render() {
    const { id } = this.props;
    return (
      <Query query={MY_STUDY_RESULTS_QUERY} variables={{ id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading ... </p>;
          if (!data.myStudyResults)
            return <p>No study found for the id {this.props.id}</p>;
          const { myStudyResults } = data;

          if (myStudyResults.length === 0) {
            return (
              <InDev
                header="No data to analyze yet"
                message="Share the study link with participants or test yourself to generate data"
              />
            );
          }

          const processedData = this.processRawData(myStudyResults);

          return <Router data={processedData} />;
        }}
      </Query>
    );
  }
}

export default StudyResults;
export { MY_STUDY_RESULTS_QUERY };
