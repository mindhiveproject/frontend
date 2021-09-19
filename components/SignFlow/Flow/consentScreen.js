import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { StyledConsentForm } from '../styles';

class ConsentScreen extends Component {
  render() {
    const { consent } = this.props;

    const publicStudies = consent?.studies.filter(study => study.public) || [];

    const regularAdultsConsent =
      consent?.info
        .filter(info => info.name === 'regularAdults')
        .map(info => info.text) || '';

    const sonaAdultsConsent =
      consent?.info
        .filter(info => info.name === 'sonaAdults')
        .map(info => info.text) || '';

    const regularMinorsConsent =
      consent?.info
        .filter(info => info.name === 'regularMinors')
        .map(info => info.text) || '';

    const sonaMinorsConsent =
      consent?.info
        .filter(info => info.name === 'sonaMinors')
        .map(info => info.text) || '';

    const regularMinorsKidsConsent =
      consent?.info
        .filter(info => info.name === 'regularMinorsKids')
        .map(info => info.text) || null;

    const sonaMinorsKidsConsent =
      consent?.info
        .filter(info => info.name === 'sonaMinorsKids')
        .map(info => info.text) || null;

    const studentsNYCConsent =
      consent?.info
        .filter(info => info.name === 'studentsNYC')
        .map(info => info.text) || null;

    return (
      <StyledConsentForm>
        <h1>
          Study consent{' '}
          {this.props.numberOfConsents > 1 ? this.props.consentNumber + 1 : ''}
        </h1>

        {this.props.under18 && (
          <>
            {(this.props.sona === 'no' ||
              typeof this.props.sona === 'undefined') && (
              <div>{ReactHtmlParser(regularMinorsConsent)}</div>
            )}

            {this.props.sona === 'yes' && (
              <div>{ReactHtmlParser(sonaMinorsConsent)}</div>
            )}

            {(this.props.sona === 'no' ||
              typeof this.props.sona === 'undefined') && (
              <div>{ReactHtmlParser(regularMinorsKidsConsent)}</div>
            )}

            {this.props.sona === 'yes' && (
              <div>{ReactHtmlParser(sonaMinorsKidsConsent)}</div>
            )}
          </>
        )}

        {!this.props.under18 && (
          <>
            {(this.props.sona === 'no' ||
              typeof this.props.sona === 'undefined') && (
              <div>{ReactHtmlParser(regularAdultsConsent)}</div>
            )}

            {this.props.sona === 'yes' && (
              <div>{ReactHtmlParser(sonaAdultsConsent)}</div>
            )}
          </>
        )}

        {this.props?.studentNYC === 'yes' && (
          <div>{ReactHtmlParser(studentsNYCConsent)}</div>
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

        <div className="buttonsHolder">
          <div>
            <button
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
