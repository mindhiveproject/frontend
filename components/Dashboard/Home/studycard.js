import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { StyledStudyCard } from '../../Bank/styles';

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
          <p>{moment(study.createdAt).format('MMMM D, YYYY')}</p>
          <p>{ReactHtmlParser(study.description)}</p>
          <Link href="/studies/[slug]" as={`/studies/${study.slug}`}>
            <a>
              <p>Read more</p>
            </a>
          </Link>
        </div>
      </StyledStudyCard>
    );
  }
}

export default StudyCard;
