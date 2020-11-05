import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import moment from 'moment';
import { saveAs } from 'file-saver';
import { jsonToCSV } from 'react-papaparse';

const LZUTF8 = require('lzutf8');

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
    const { study, task, user } = res;
    let { data } = res;
    const fullContent = res.fullData?.content;
    const incrementalContent =
      res.incrementalData.length && res.incrementalData.map(d => d.content);

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
    data.map(line => {
      line.participantId = user?.publicId;
      line.task = task?.title;
      line.study = study?.title;
      return line;
    });
    const studyTitle =
      (study &&
        study.title
          .toLowerCase()
          .split(' ')
          .join('-')) ||
      '';
    const taskTitle =
      (task &&
        task.title
          .toLowerCase()
          .split(' ')
          .join('-')) ||
      '';
    const publicId = user.publicId
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
    saveAs(blob, `${studyTitle}--${taskTitle}--${publicId}.csv`);
  };

  render() {
    const { result } = this.props;

    return (
      <StyledResultLine>
        <h1>{result?.study?.title}</h1>
        <h2>{result?.task?.title}</h2>
        <h3>{result.user && result.user.publicId}</h3>
        <h3>{moment(result?.updatedAt).fromNow()}</h3>
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
