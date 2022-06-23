import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import PropTypes from 'prop-types';

import slugify from 'slugify';
// query and mutations
import { STUDY_DEVELOPMENT_QUERY } from '../Queries/Study';

import Controller from './Controller';

const makeCloneName = title => {
  const randomNumber = Math.floor(Math.random() * 10000);
  const newTitle = `Clone of ${title}-${randomNumber}`;
  const slug = slugify(newTitle, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: /[^a-zA-Z\d\s:]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
  });
  return { slug, title: newTitle };
};

export default class DevelopArea extends Component {
  render() {
    const { user, needToClone, adminMode } = this.props;

    return (
      <Query
        query={STUDY_DEVELOPMENT_QUERY}
        variables={{ id: this.props.studyId }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading ... </p>;
          if (error) return <p>Error: {error.message}</p>;
          if (!data || !data.study) {
            return <h1>No study found for id {this.props.studyId}</h1>;
          }

          const isAuthorOrCollaborator =
            user.id === data.study?.author?.id ||
            data.study?.collaborators.map(c => c.id).includes(user.id);

          let study;
          if (needToClone && !adminMode) {
            study = {
              ...data.study,
              consentId: null,
              consent: null,
              collaborators: [user?.username],
              collaboratorProfiles: data.study.collaborators, // complete collaborator profiles
              classes: null,
              tags: null,
              ...makeCloneName(data.study.title),
            };
          } else if (isAuthorOrCollaborator || adminMode) {
            study = {
              ...data.study,
              consentId: data.study.consent.map(consent => consent?.id),
              collaborators: (data.study.collaborators &&
                data.study.collaborators.map(c => c.username).length &&
                data.study.collaborators.map(c => c.username)) || [''],
              collaboratorProfiles: data.study.collaborators, // complete collaborator profiles
              classes: data.study.classes.map(cl => cl?.id),
              tags: data.study.tags.map(tag => tag?.id),
            };
          } else {
            study = {
              ...data.study,
              consentId: null,
              consent: null,
              collaborators: [user?.username],
              collaboratorProfiles: data.study.collaborators, // complete collaborator profiles
              classes: null,
              tags: null,
              ...makeCloneName(data.study.title),
            };
          }

          return (
            <Controller
              onLeave={this.props.onLeave}
              study={study}
              user={this.props.user}
              needToClone={needToClone}
              adminMode={adminMode}
              newStudyFromScratch={this.props.newStudyFromScratch}
            />
          );
        }}
      </Query>
    );
  }
}

DevelopArea.propTypes = {
  studyId: PropTypes.string.isRequired,
};
