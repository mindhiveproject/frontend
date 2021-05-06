import React, { Component } from 'react';
import moment from 'moment';

class Result extends Component {
  render() {
    const { result } = this.props;
    return (
      <div className="resultItem">
        <div>{result?.study?.title}</div>
        <div>{result?.task?.title}</div>
        <div>{moment(result?.createdAt).format('MMMM D, YYYY, h:mm:ss')}</div>
        <div>{moment(result?.updatedAt).format('MMMM D, YYYY, h:mm:ss')}</div>
        <div>{result.dataPolicy}</div>
        <div>{result.payload}</div>
        <div>{result?.fullData?.id ? 'yes' : 'no'}</div>
        <div>{result.quantity}</div>
        <div>{result?.incrementalData?.length}</div>
        <div>{result?.resultType}</div>
      </div>
    );
  }
}

export default Result;
