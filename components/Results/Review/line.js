import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import moment from 'moment';
import DeleteResultBtn from '../Delete/index';

const StyledResultLine = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  grid-column-gap: 20px;
  border: 1px solid grey;
  padding: 10px;
  align-items: center;
`;

class ResultLine extends Component {
  render() {
    const { result } = this.props;
    return (
      <StyledResultLine>
        <h1>{result.experiment.title}</h1>
        <p>{moment(result.updatedAt).fromNow()}</p>
        <Link
          href={{
            pathname: '/res/ind',
            query: { id: result.id },
          }}
        >
          <button>
            <a>
              <h2>Visualize data</h2>
            </a>
          </button>
        </Link>

        <DeleteResultBtn id={result.id}>Delete</DeleteResultBtn>
      </StyledResultLine>
    );
  }
}

export default ResultLine;
