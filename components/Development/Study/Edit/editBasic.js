import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Link from 'next/link';

import { Select } from 'semantic-ui-react';
import { CONSENTS_QUERY } from '../../../Task/Customize/taskForm';

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

    return (
      <StyledBasicPane>
        <div>
          <div>
            <label htmlFor="shortDescription">
              Study description (for researchers only)
              <textarea
                id="shortDescription"
                name="shortDescription"
                value={study.shortDescription}
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
                  <p>IRB consent</p>
                  <select
                    type="text"
                    id="consent"
                    name="consent"
                    value={study.consent}
                    onChange={this.props.handleStudyChange}
                  >
                    <option value="no">Choose the consent form</option>
                    {consents.map(consent => (
                      <option key={consent.id} value={consent.id}>
                        {consent.title}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }}
          </Query>
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
      </StyledBasicPane>
    );
  }
}

export default EditBasic;
