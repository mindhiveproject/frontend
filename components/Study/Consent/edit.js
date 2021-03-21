import React, { Component } from 'react';
import { Query, Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Router from 'next/router';

import EditStudyConsentForm from './form';

// query the current state of the consent form
const STUDY_CONSENT_QUERY = gql`
  query STUDY_CONSENT_QUERY {
    me {
      id
      info
    }
  }
`;

// mutation for changing the current state of the consent form
const UPDATE_STUDY_CONSENT_MUTATION = gql`
  mutation UPDATE_STUDY_CONSENT_MUTATION($id: ID!, $info: Json) {
    updateStudyConsent(id: $id, info: $info) {
      id
      slug
    }
  }
`;

class UpdateStudyConsent extends Component {
  update = async (e, state, updateStudyConsentMutation) => {
    e.preventDefault();
    const res = await updateStudyConsentMutation({
      variables: {
        id: this.props.id,
        info: { ...state },
      },
    });
    Router.push(
      '/studies/[slug]',
      `/studies/${res.data.updateStudyConsent.slug}`
    );
  };

  render() {
    return (
      <Query query={STUDY_CONSENT_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.me) return <p>No information found</p>;
          const studyConsent = data.me?.info[this.props.id];
          return (
            <Mutation
              mutation={UPDATE_STUDY_CONSENT_MUTATION}
              refetchQueries={[{ query: STUDY_CONSENT_QUERY }]}
            >
              {(updateStudyConsent, { loading, error }) => (
                <EditStudyConsentForm
                  title="Edit the study consent"
                  error={error}
                  loading={loading}
                  info={studyConsent}
                  onSubmit={this.update}
                  callback={updateStudyConsent}
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateStudyConsent;
