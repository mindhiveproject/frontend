import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import styled from 'styled-components';
import Link from 'next/link';

import { Select } from 'semantic-ui-react';
import { CONSENTS_QUERY } from '../../../../Task/Customize/taskForm';

import ConsentsSelector from './consentsSelector';

const StyledBasicPane = styled.div`
  display: grid;
  grid-gap: 20px;
  .accessLink {
    padding: 15px 10px 15px 10px;
    background: #fff3cd;
    border-radius: 4px;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    cursor: pointer;
    margin-top: 14px;
  }
`;

class EditBasic extends Component {
  copyLink = () => {
    const copyLink = `https://mindhive.science/studies/${this.props.study.slug}`;
    const temp = document.createElement('input');
    document.body.append(temp);
    temp.value = copyLink;
    temp.select();
    document.execCommand('copy');
    temp.remove();
  };

  render() {
    const { study, user } = this.props;
    const hasIRBAccess =
      user &&
      user?.permissions &&
      (user.permissions.includes('TEACHER') ||
        user.permissions.includes('SCIENTIST') ||
        user.permissions.includes('ADMIN'));
    const isAuthor =
      user.id === study?.author?.id ||
      study?.collaborators.includes(user.username);

    return (
      <StyledBasicPane>
        <div>
          <div>
            <label htmlFor="shortDescription">
              Study description (for researchers only)
              <textarea
                id="shortDescription"
                name="shortDescription"
                value={study.shortDescription || ''}
                onChange={this.props.handleStudyChange}
                rows="10"
              />
            </label>
          </div>
          <span>
            This is for internal use only. Participants won’t see this
            description.
          </span>
        </div>

        {hasIRBAccess && (
          <Query query={CONSENTS_QUERY}>
            {({ data, loading, error }) => {
              if (loading) return <p>Loading ... </p>;
              const { consents } = data;
              return (
                <div className="consentSelector">
                  <p>IRB consent(s)</p>
                  <ConsentsSelector
                    consents={consents}
                    study={study}
                    handleSetState={this.props.handleSetState}
                  />
                </div>
              );
            }}
          </Query>
        )}

        {!this.props.needToClone && (
          <>
            <label htmlFor="slug">
              <span>
                Click the box with the link to your study below to copy it. Feel
                free to shorten it. A tip - avoid spaces in the url. Use dashes
                instead, for example. You will share this link with
                participants. Warning: if you have already shared this study,
                the link you shared before will no longer work.
              </span>
              <input
                type="text"
                id="slug"
                name="slug"
                placeholder="Slug for url"
                value={study.slug}
                onChange={this.props.handleStudyChange}
                required
              />
            </label>
          </>
        )}

        {study.slug && (
          <div>
            <p>Private access link</p>
            <span>
              Anyone with the link will be able to preview and participate in
              the study. Click below to copy link.
            </span>
            <label htmlFor="slug" onClick={() => this.copyLink()}>
              <p className="accessLink">
                https://mindhive.science/studies/
                {study.slug}
              </p>
            </label>
          </div>
        )}

        {isAuthor && (
          <Link
            href={{
              pathname: '/study/results',
              query: { id: study.id },
            }}
          >
            <a>
              <h2>
                <button>Study results</button>
              </h2>
            </a>
          </Link>
        )}

        {isAuthor && (
          <Link
            href={{
              pathname: '/data/study',
              query: { id: study.id },
            }}
          >
            <a target="_blank">
              <h2>
                <button>Data Viz (beta)</button>
              </h2>
            </a>
          </Link>
        )}
      </StyledBasicPane>
    );
  }
}

export default EditBasic;

// {hasIRBAccess && (
//   <Query query={CONSENTS_QUERY}>
//     {({ data, loading, error }) => {
//       if (loading) return <p>Loading ... </p>;
//       const { consents } = data;
//       return (
//         <div className="consentSelector">
//           <p>IRB consent</p>
//           <select
//             type="text"
//             id="consent"
//             name="consent"
//             value={study.consent}
//             onChange={this.props.handleStudyChange}
//           >
//             <option value="no">Choose the consent form</option>
//             {consents.map(consent => (
//               <option key={consent.id} value={consent.id}>
//                 {consent.title}
//               </option>
//             ))}
//           </select>
//         </div>
//       );
//     }}
//   </Query>
// )}
