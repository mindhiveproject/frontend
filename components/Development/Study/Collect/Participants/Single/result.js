import React, { Component } from 'react';
import moment from 'moment';

import { saveAs } from 'file-saver';
import { jsonToCSV } from 'react-papaparse';

import DeleteResult from '../../../../../Results/Delete/delete';

const LZUTF8 = require('lzutf8');

class Result extends Component {
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
      line.publicReadableId = user?.publicReadableId;
      line.task = task?.title;
      line.taskSubtitle = task?.subtitle;
      line.study = study?.title;
      return line;
    });

    const userID =
      user.publicReadableId || user.publicId || user.id || 'john-doe';

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
    const publicId = userID
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
      <div className="resultItem">
        <div>{result?.study?.title}</div>
        <div>{result?.task?.title}</div>
        <div>{result?.task?.subtitle}</div>
        <div>{moment(result?.createdAt).format('MMMM D, YY, h:mm:ss')}</div>
        <div>{moment(result?.updatedAt).format('MMMM D, YY, h:mm:ss')}</div>
        <div>{result.dataPolicy}</div>
        <div>{result.payload}</div>
        <div>{result?.fullData?.id ? 'yes' : 'no'}</div>
        <div>{result.quantity}</div>
        <div>{result?.incrementalData?.length}</div>
        <div>{result?.resultType}</div>
        <a onClick={() => this.download(result)}>Download</a>
        <DeleteResult id={result.id} refetchQueries={this.props.refetchQueries}>
          <a>Delete</a>
        </DeleteResult>
      </div>
    );
  }
}

export default Result;
