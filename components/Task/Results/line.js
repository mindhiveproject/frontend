import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import moment from 'moment';
import { saveAs } from 'file-saver';
import { jsonToCSV } from 'react-papaparse';

const pako = require('pako');

const StyledResultLine = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-column-gap: 20px;
  border: 1px solid grey;
  padding: 10px;
  align-items: center;
`;

class ResultLine extends Component {
  download = res => {
    const { task, user } = res;

    let { data } = res;
    const fullContent = res.fullData?.content;
    const incrementalContent =
      res.incrementalData.length && res.incrementalData.map(d => d.content);

    if (fullContent) {
      data = JSON.parse(pako.inflate(fullContent, { to: 'string' }));
    }
    if (!fullContent && incrementalContent && incrementalContent.length) {
      data = incrementalContent
        .map(p => JSON.parse(pako.inflate(p, { to: 'string' })))
        .reduce((total, amount) => total.concat(amount), []);
    }

    const name =
      (task &&
        task.title
          .toLowerCase()
          .split(' ')
          .join('-')) ||
      '';
    const username = user.username
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
    saveAs(blob, `${username}-${name}.csv`);
  };

  render() {
    const { result } = this.props;

    return (
      <StyledResultLine>
        <h1>{result.study && result.study.title}</h1>
        <h2>{result.task && result.task.title}</h2>
        <h4>{result.user && result.user.username}</h4>
        <p>{moment(result.updatedAt).fromNow()}</p>
        <div>
          <button onClick={() => this.download(result)}>
            <a>
              <h2>Download csv file</h2>
            </a>
          </button>
        </div>
      </StyledResultLine>
    );
  }
}

export default ResultLine;
