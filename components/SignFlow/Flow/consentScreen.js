import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { StyledConsentForm } from '../styles';

class ConsentScreen extends Component {
  getConsent = (consent, name) =>
    consent?.info.filter(info => info.name === name).map(info => info.text) ||
    '';

  render() {
    const { consent, children } = this.props;

    const publicStudies = consent?.studies.filter(study => study.public) || [];

    const regularAdultsConsent = this.getConsent(consent, 'regularAdults');
    const sonaAdultsConsent = this.getConsent(consent, 'sonaAdults');
    const regularMinorsConsent = this.getConsent(consent, 'regularMinors');
    const sonaMinorsConsent = this.getConsent(consent, 'sonaMinors');
    const regularMinorsKidsConsent = this.getConsent(
      consent,
      'regularMinorsKids'
    );
    const sonaMinorsKidsConsent = this.getConsent(consent, 'sonaMinorsKids');
    const studentsNYCConsent = this.getConsent(consent, 'studentsNYC');
    const studentsMinorsNYCConsent = this.getConsent(
      consent,
      'studentsMinorsNYC'
    );
    const studentsParentsNYCConsent = this.getConsent(
      consent,
      'studentsParentsNYC'
    );

    return (
      <StyledConsentForm>
        <h1>
          Study consent{' '}
          {this.props.numberOfConsents > 1 ? this.props.consentNumber + 1 : ''}
        </h1>

        {this.props.under18 && (
          <>
            {(this.props.sona === 'no' ||
              typeof this.props.sona === 'undefined' ||
              !sonaMinorsConsent.length ||
              !sonaMinorsKidsConsent.length) &&
              (this.props.studentNYC === 'no' ||
                typeof this.props.studentNYC === 'undefined' ||
                !studentsParentsNYCConsent.length ||
                !studentsMinorsNYCConsent.length) && (
                <>
                  <div>{ReactHtmlParser(regularMinorsConsent)}</div>
                  <div>{ReactHtmlParser(regularMinorsKidsConsent)}</div>
                </>
              )}

            {this.props.sona === 'yes' &&
              sonaMinorsConsent &&
              sonaMinorsKidsConsent && (
                <>
                  <div>{ReactHtmlParser(sonaMinorsConsent)}</div>
                  <div>{ReactHtmlParser(sonaMinorsKidsConsent)}</div>
                </>
              )}

            {this.props?.studentNYC === 'yes' &&
              studentsParentsNYCConsent &&
              studentsMinorsNYCConsent && (
                <>
                  <div>{ReactHtmlParser(studentsParentsNYCConsent)}</div>
                  <div>{ReactHtmlParser(studentsMinorsNYCConsent)}</div>
                </>
              )}
          </>
        )}

        {!this.props.under18 && (
          <>
            {(this.props.sona === 'no' ||
              typeof this.props.sona === 'undefined' ||
              !sonaAdultsConsent.length) &&
              (this.props.studentNYC === 'no' ||
                typeof this.props.studentNYC === 'undefined' ||
                !studentsNYCConsent.length) && (
                <div>{ReactHtmlParser(regularAdultsConsent)}</div>
              )}

            {this.props.sona === 'yes' && sonaAdultsConsent && (
              <div>{ReactHtmlParser(sonaAdultsConsent)}</div>
            )}

            {this.props?.studentNYC === 'yes' && studentsNYCConsent && (
              <div>{ReactHtmlParser(studentsNYCConsent)}</div>
            )}
          </>
        )}

        {consent && (
          <div className="consentInfo">
            <div>
              <p>
                This study is part of the{' '}
                <strong>{consent?.organization}</strong> research protocol{' '}
                <strong>{consent?.title}</strong>.
              </p>

              {publicStudies.length ? (
                <div>
                  <p>
                    Tasks and surveys associated with the following studies are
                    covered under this protocol
                  </p>

                  <div className="coveredStudiesAndTasks">
                    {publicStudies.map(study => (
                      <li key={study.id}>{study.title}</li>
                    ))}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}

        {children}

        <div className="buttonsHolder">
          <div>
            <button
              className="secondary"
              onClick={() =>
                this.props.recordMyConsent(
                  consent?.id,
                  'agree',
                  this.props.joinStudy
                )
              }
            >
              I agree, next
            </button>
          </div>

          <div>
            <a
              onClick={() =>
                this.props.recordMyConsent(
                  consent?.id,
                  'skipped',
                  this.props.joinStudy
                )
              }
            >
              <p>Skip consent</p>
            </a>
          </div>
        </div>
      </StyledConsentForm>
    );
  }
}

export default ConsentScreen;

// <div>
//   <label htmlFor="covered">
//     <div className="checkboxField">
//       <input
//         type="checkbox"
//         id="covered"
//         name="covered"
//         checked={this.props.covered}
//         onChange={this.toggleState}
//       />
//       <span>
//         Save my consent for all covered studies/tasks (if you
//         uncheck this box, you will be prompted with this consent
//         page each time).
//       </span>
//     </div>
//   </label>
// </div>

// {false && (
//   <div className="coveredStudiesAndTasks">
//     {consent.tasks.length ? (
//       <div>
//         <p>Tasks</p>
//         {consent.tasks.map(task => (
//           <li key={task.id}>{task.title}</li>
//         ))}
//       </div>
//     ) : (
//       <div></div>
//     )}
//   </div>
// )}
