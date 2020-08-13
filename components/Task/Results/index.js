import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';

import moment from 'moment';
import { saveAs } from 'file-saver';
import { jsonToCSV } from 'react-papaparse';
import styled from 'styled-components';
import ResultLine from './line';
import Error from '../../ErrorMessage/index';

const StyledResults = styled.div`
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

const MY_TASK_RESULTS_QUERY = gql`
  query MY_TASK_RESULTS_QUERY($id: ID!) {
    myTaskResults(where: { id: $id }) {
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

class TaskResults extends Component {
  downloadAll = results => {
    const allData = results
      .map(result => {
        const resultData = result.data.map(line => {
          line.username = result.user && result.user.username;
          line.task = result.task && result.task.title;
          return line;
        });
        return resultData;
      })
      .reduce((a, b) => a.concat(b), []);
    const name =
      (results.length &&
        results[0] &&
        results[0].task &&
        results[0].task.title
          .toLowerCase()
          .split(' ')
          .join('-')) ||
      '';
    const allKeys = allData
      .map(line => Object.keys(line))
      .reduce((a, b) => a.concat(b), []);
    const keys = Array.from(new Set(allKeys));
    const csv = jsonToCSV({ fields: keys, data: allData });
    const blob = new Blob([csv], {
      type: 'text/csv',
    });
    saveAs(blob, `${name}.csv`);
  };

  render() {
    return (
      <Query query={MY_TASK_RESULTS_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.myTaskResults)
            return <p>No class found for {this.props.id}</p>;
          const { myTaskResults } = data;
          if (myTaskResults.length === 0) {
            return <h2>No results for this task</h2>;
          }
          return (
            <StyledResults>
              <div className="resultsHeader">
                <button onClick={() => this.downloadAll(myTaskResults)}>
                  Download all results for this task
                </button>
              </div>
              {myTaskResults.map(result => (
                <ResultLine key={result.id} result={result} />
              ))}
            </StyledResults>
          );
        }}
      </Query>
    );
  }
}

export default TaskResults;
export { MY_TASK_RESULTS_QUERY };
