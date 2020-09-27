import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { StyledTaskCard } from '../styles';

class SurveyCard extends Component {
  render() {
    const { survey } = this.props;

    return (
      <StyledTaskCard taskType={survey.taskType}>
        {survey.image && (
          <div className="surveyImage">
            <img src={survey.image} alt={survey.title} />
          </div>
        )}
        <div className="cardInfo">
          <h2>{survey.title}</h2>
          <p>{ReactHtmlParser(survey.description)}</p>
          <Link
            href={{
              pathname: '/task/preview',
              query: { id: survey.id, r: this.props.redirect },
            }}
          >
            <a>
              <p>Preview</p>
            </a>
          </Link>
          {false && (
            <Link href="/studies/[slug]" as={`/studies/${survey.slug}`}>
              <a>
                <p>Create Using Task Template</p>
              </a>
            </Link>
          )}
        </div>
      </StyledTaskCard>
    );
  }
}

export default SurveyCard;
