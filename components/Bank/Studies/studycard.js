import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { StyledStudyCard } from '../styles';
import DeleteStudy from './delete';

class StudyCard extends Component {
  render() {
    const { study, user } = this.props;
    const isAuthor =
      user?.id === study?.author?.id ||
      study?.collaborators.map(c => c.id).includes(user?.id);

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
            <div>
              <a
                onClick={() => {
                  this.props.onSelectStudy(study);
                }}
              >
                Go to study
              </a>
            </div>
            {this.props.developingMode && !this.props.readOnlyMode && isAuthor && (
              <div>
                <DeleteStudy id={study.id}>Delete</DeleteStudy>
              </div>
            )}
          </div>
        </div>
      </StyledStudyCard>
    );
  }
}

export default StudyCard;
