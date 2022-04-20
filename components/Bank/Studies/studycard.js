import { useMemo } from 'react';
import ReactHtmlParser from 'react-html-parser';

import { StyledStudyCard } from '../styles';

import ManageStudy from './manage';
import ToggleUserStudyHide from './toggleUserStudyHide';

// compute the number of different types of permissions in author and collaborators
// excluding admin
const computeNumberExceptAdmin = ({ study, role }) => {
  const collaborators =
    study?.collaborators
      .filter(person => person?.id !== study?.author?.id) // not the study author
      .map(person => person?.permissions)
      .filter(permissions => !permissions?.includes('ADMIN')) // not an admin
      .filter(permissions => permissions?.includes(role)).length || 0;
  const author =
    !study?.author?.permissions?.includes('ADMIN') &&
    study?.author?.permissions?.includes(role)
      ? 1
      : 0;
  return collaborators + author;
};

// compute the number of different types of permissions
const computeNumber = ({ study, role }) => {
  const collaborators =
    study?.collaborators
      .filter(person => person?.id !== study?.author?.id) // not the study author
      .map(person => person?.permissions)
      .filter(permissions => permissions?.includes(role)).length || 0;
  const author = study?.author?.permissions?.includes(role) ? 1 : 0;
  return collaborators + author;
};

function StudyCard({
  study,
  user,
  onSelectStudy,
  overviewMode,
  showAllStudies,
  developingMode,
}) {
  const numberOfStudents = useMemo(
    () => computeNumberExceptAdmin({ study, role: 'STUDENT' }),
    [study]
  );
  // count scientists if they are also admins
  const numberOfScientists = useMemo(
    () => computeNumber({ study, role: 'SCIENTIST' }),
    [study]
  );
  const numberOfTeachers = useMemo(
    () => computeNumberExceptAdmin({ study, role: 'TEACHER' }),
    [study]
  );

  const isHidden =
    user?.studiesInfo && user?.studiesInfo[study?.id]?.hideInDevelop;

  const numberOfUsers = study?.participants?.length || 0;
  const numberOfGuests = study?.guests?.length || 0;
  const numberOfParticipants = numberOfUsers + numberOfGuests;

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
          onSelectStudy(study);
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
            {false && (
              <div className="studyParticipants">
                {numberOfParticipants} study participant
                {numberOfParticipants === 1 ? '' : 's'}
              </div>
            )}

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
              {numberOfStudents > 0 && (
                <div className="studyCreatedBySection">
                  <div className="studyCreatedByNumber">
                    {numberOfStudents || '--'}
                  </div>
                  <p>Student{numberOfStudents === 1 ? '' : 's'}</p>
                </div>
              )}

              {numberOfScientists > 0 && (
                <div className="studyCreatedBySection">
                  <div className="studyCreatedByNumber">
                    {numberOfScientists || '--'}
                  </div>
                  <p>Scientist{numberOfScientists === 1 ? '' : 's'}</p>
                </div>
              )}

              {numberOfTeachers > 0 && (
                <div className="studyCreatedBySection">
                  <div className="studyCreatedByNumber">
                    {numberOfTeachers || '--'}
                  </div>
                  <p>Teacher{numberOfTeachers === 1 ? '' : 's'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="tempOverlay">
        {overviewMode && (
          <div className="studyAdmin">
            <div>
              <div className="message">
                {study?.submitForPublishing && (
                  <div>Submitted for publishing</div>
                )}
              </div>
              <ManageStudy
                id={study.id}
                isPublic={study.public}
                isFeatured={study.featured}
              />
            </div>
          </div>
        )}
        {developingMode && (
          <div className="studyAdmin">
            <ToggleUserStudyHide id={study?.id} isHidden={isHidden}>
              {isHidden ? 'Unhide' : 'Hide'}
            </ToggleUserStudyHide>
          </div>
        )}
      </div>
    </StyledStudyCard>
  );
}

export default StudyCard;
