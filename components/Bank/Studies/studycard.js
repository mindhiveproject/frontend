import React, { Component } from 'react';
// import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';

import { StyledStudyCard } from '../styles';

// import DeleteStudy from './delete';
import ManageStudy from './manage';

// compute the number of different types of permissions in author and collaborators
const computeNumber = ({ study, role }) => {
  const collaborators =
    study?.collaborators
      .map(person => person?.permissions)
      .filter(permissions => permissions?.includes(role)).length || 0;
  const author = study?.author?.permissions?.includes(role) ? 1 : 0;
  return collaborators + author;
};

class StudyCard extends Component {
  render() {
    const { study, user } = this.props;

    const numberOfStudents = computeNumber({ study, role: 'STUDENT' });
    const numberOfScientists = computeNumber({ study, role: 'SCIENTIST' });
    const numberOfTeachers = computeNumber({ study, role: 'TEACHER' });

    const numberOfParticipants = study?.participants?.length || 0;

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
      if (description.split(' ').length > 20) {
        publicCardDescription = `${description
          .split(' ')
          .slice(0, 20)
          .join(' ')} ...`;
      } else {
        publicCardDescription = description;
      }
    }

    return (
      <StyledStudyCard>
        <div
          className="clickableWrapper"
          onClick={() => {
            this.props.onSelectStudy(study);
          }}
        >
          <div className="studyImage">
            {study.image ? (
              <img src={study.image} alt={study.title} />
            ) : (
              <div className="noImage"></div>
            )}
          </div>

          <div className="cardInfo">
            <div className="studyMain">
              <div className="studyParticipants">
                {numberOfParticipants} study participant
                {numberOfParticipants === 1 ? '' : 's'}
              </div>

              <div className="studyHeader">
                <h2>{study.title}</h2>
              </div>

              <div className="studyDescription">
                {ReactHtmlParser(publicCardDescription)}
              </div>
            </div>

            <div className="studyCreatedBy">
              <div className="studyCreatedByHeader">Created by</div>
              <div className="studyCreatedByPanel">
                <div className="studyCreatedBySection">
                  <div className="studyCreatedByNumber">
                    {numberOfStudents || '--'}
                  </div>
                  <p>Student{numberOfStudents === 1 ? '' : 's'}</p>
                </div>
                <div className="studyCreatedBySection">
                  <div className="studyCreatedByNumber">
                    {numberOfScientists || '--'}
                  </div>
                  <p>Scientist{numberOfScientists === 1 ? '' : 's'}</p>
                </div>
                <div className="studyCreatedBySection">
                  <div className="studyCreatedByNumber">
                    {numberOfTeachers || '--'}
                  </div>
                  <p>Teacher{numberOfTeachers === 1 ? '' : 's'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.props.overviewMode && (
          <div className="studyAdmin">
            <ManageStudy
              id={study.id}
              isPublic={study.public}
              isFeatured={study.featured}
            />
            <div>
              {study?.submitForPublishing && (
                <div>The study was submitted for publishing</div>
              )}
            </div>
          </div>
        )}
      </StyledStudyCard>
    );
  }
}

export default StudyCard;

// {this.props.developingMode && (
//   <div>{ReactHtmlParser(cardDescription)}</div>
// )}

// {false && this.props.developingMode && isAuthor && (
//   <div>
//     <DeleteStudy id={study.id}>Delete</DeleteStudy>
//   </div>
// )}

// <div>
//   <a
//     onClick={() => {
//       this.props.onSelectStudy(study);
//     }}
//   >
//     Go to study
//   </a>
// </div>;
