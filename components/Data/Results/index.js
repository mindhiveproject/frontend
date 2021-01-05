import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import styled from 'styled-components';
import { saveAs } from 'file-saver';
import { jsonToCSV } from 'react-papaparse';
import Error from '../../ErrorMessage/index';
import Display from './display';

const LZUTF8 = require('lzutf8');

const StyledResults = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  width: 90%;
  .resultsHeader {
    margin-bottom: 20px;
  }
  button {
    border: 1px solid grey;
    border-radius: 0;
    cursor: pointer;
    text-transform: uppercase;
    padding: 0.8rem 1.5rem;
    transform: skew(-2deg);
    display: inline-block;
    transition: all 0.5s;
    &[disabled] {
      opacity: 0.5;
    }
  }
  button: hover {
    background: rgb(246, 110, 94);
    a {
      color: white;
    }
  }
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
    }
  }
`;

class StudyResults extends Component {
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

        const resultData = data.map(line => {
          line.participantId = result.user && result.user.publicId;
          line.task = result.task && result.task.title;
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
            const processedData = this.processRawData(myStudyResults);
            // console.log('myStudyResults', myStudyResults);
            return (
              <StyledResults>
                <h2>Analysis</h2>
                <Display data={processedData} />
              </StyledResults>
            );
          }}
        </Query>
      </StyledResults>
    );
  }
}

export default StudyResults;
export { MY_STUDY_RESULTS_QUERY };
