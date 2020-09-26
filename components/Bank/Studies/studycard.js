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
        {study.image && (
          <div className="studyImage">
            <img src={study.image} alt={study.title} />
          </div>
        )}

        <div className="cardInfo">
          <h2>{study.title}</h2>
          <p>{ReactHtmlParser(study.description)}</p>
          <a
            onClick={() => {
              this.props.onSelectStudy(study);
            }}
          >
            Go to study
          </a>
        </div>
      </StyledStudyCard>
    );
  }
}

export default StudyCard;

// <Link
//   href={{
//     pathname: `/studies/${study.slug}`,
//   }}
// >
//   <a>
//     <p>Go to study</p>
//   </a>
// </Link>
