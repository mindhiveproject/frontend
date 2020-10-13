import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { StyledStudyCard } from '../styles';

class StudyCard extends Component {
  render() {
    const { study } = this.props;

    return (
      <StyledStudyCard>
        <div className="studyImage">
          {study.image ? (
            <img src={study.image} alt={study.title} />
          ) : (
            <div className="noImage"></div>
          )}
        </div>

        <div className="cardInfo">
          <h2>{study.title}</h2>
          {ReactHtmlParser(study.description)}
          {this.props.developingMode && (
            <div>{ReactHtmlParser(study.shortDescription)}</div>
          )}
          <div className="studyLink">
            <a
              onClick={() => {
                this.props.onSelectStudy(study);
              }}
            >
              Go to study
            </a>
          </div>
        </div>
      </StyledStudyCard>
    );
  }
}

export default StudyCard;
