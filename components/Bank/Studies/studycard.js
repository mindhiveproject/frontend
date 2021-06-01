import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { StyledStudyCard } from '../styles';

import DeleteStudy from './delete';
import PublishStudy from './publish';

class StudyCard extends Component {
  render() {
    const { study, user } = this.props;

    // console.log('study', study.submitForPublishing);

    const isAuthor =
      user?.id === study?.author?.id ||
      study?.collaborators.map(c => c.id).includes(user?.id);

    const { shortDescription } = study;
    let cardDescription;
    if (shortDescription) {
      if (shortDescription.split(' ').length > 20) {
        cardDescription = `${shortDescription
          .split(' ')
          .slice(0, 20)
          .join(' ')} ...`;
      } else {
        cardDescription = shortDescription;
      }
    }

    const { description } = study;
    let publicCardDescription;
    if (description) {
      if (description.split(' ').length > 30) {
        publicCardDescription = `${description
          .split(' ')
          .slice(0, 30)
          .join(' ')} ...`;
      } else {
        publicCardDescription = description;
      }
    }

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

          <div>
            {ReactHtmlParser(publicCardDescription)}
            {this.props.developingMode && (
              <div>{ReactHtmlParser(cardDescription)}</div>
            )}
          </div>

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
            {this.props.developingMode && isAuthor && (
              <div>
                <DeleteStudy id={study.id}>Delete</DeleteStudy>
              </div>
            )}
            {this.props.overviewMode && (
              <PublishStudy id={study.id} isPublic={study.public} />
            )}
          </div>

          {this.props.overviewMode && study?.submitForPublishing && (
            <div>
              <p>The study was submitted for publishing</p>
            </div>
          )}
        </div>
      </StyledStudyCard>
    );
  }
}

export default StudyCard;
