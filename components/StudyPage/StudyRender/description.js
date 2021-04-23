import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class StudyDescription extends Component {
  render() {
    const { study } = this.props;

    return (
      <div className="studyTitleDescriptionBtns">
        <h1>{study.title}</h1>
        <div className="studyDescription">
          <h3>{ReactHtmlParser(study.description)}</h3>
        </div>
        <div className="controlBtns"></div>
      </div>
    );
  }
}

export default StudyDescription;
