import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import moment from 'moment';
import { Query } from 'react-apollo';
import { saveAs } from 'file-saver';
import { jsonToCSV } from 'react-papaparse';
import DeleteResultBtn from '../Delete/index';
import { DISPLAY_RESULT_QUERY } from '../Display/individual';

const StyledResultLine = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-column-gap: 20px;
  border: 1px solid grey;
  padding: 10px;
  align-items: center;
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

class ResultLine extends Component {
  download = res => {
    const { data, experiment } = res;
    const name = experiment.title
      .toLowerCase()
      .split(' ')
      .join('-');
    const allKeys = data
      .map(line => Object.keys(line))
      .reduce((a, b) => a.concat(b), []);
    const keys = Array.from(new Set(allKeys));
    const csv = jsonToCSV({ fields: keys, data });
    const blob = new Blob([csv], {
      type: 'text/csv',
    });
    saveAs(blob, `${name}.csv`);
  };

  render() {
    const { result } = this.props;
    return (
      <Query query={DISPLAY_RESULT_QUERY} variables={{ id: result.id }}>
        {({ error, loading, data }) => {
          console.log('data', data);
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.result)
            return <p>No result found for {this.props.resultId}</p>;
          const { result } = data;
          return (
            <StyledResultLine>
              <h1>{result.experiment.title}</h1>
              <p>{moment(result.updatedAt).fromNow()}</p>

              <div>
                <button onClick={() => this.download(result)}>
                  <a>
                    <h2>Download csv file</h2>
                  </a>
                </button>
              </div>
              <DeleteResultBtn id={result.id}>Delete</DeleteResultBtn>
            </StyledResultLine>
          );
        }}
      </Query>
    );
  }
}

export default ResultLine;
//
// <Link
//   href={{
//     pathname: '/res/ind',
//     query: { id: result.id },
//   }}
// >
//   <button>
//     <a>
//       <h2>Visualize data</h2>
//     </a>
//   </button>
// </Link>
