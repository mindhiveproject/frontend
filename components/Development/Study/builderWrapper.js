import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import slugify from 'slugify';
import StudyBuilder from './builder';
import EmptyPage from '../../Page/empty';

const PROJECT_QUERY = gql`
  query PROJECT_QUERY($id: ID!) {
    study(where: { id: $id }) {
      id
      title
      slug
      shortDescription
      description
      settings
      image
      largeImage
      info
      author {
        id
      }
      collaborators {
        id
        username
      }
      consent {
        id
      }
      tasks {
        id
        title
        description
      }
      proposal {
        id
      }
      components
      public
      submitForPublishing
    }
  }
`;

const makeCloneNames = title => {
  const randomNumber = Math.floor(Math.random() * 10000);
  const newTitle = `Clone of ${title}-${randomNumber}`;
  const slug = slugify(newTitle, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: /[^a-zA-Z\d\s:]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
  });
  return { slug, title: newTitle };
};

class StudyBuilderWrapper extends Component {
  render() {
    const { user, needToClone, adminMode } = this.props;
    return (
      <Query query={PROJECT_QUERY} variables={{ id: this.props.studyId }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.study)
            return <h1>No study found for id {this.props.studyId}</h1>;

          const isAuthor =
            user.id === data.study?.author?.id ||
            data.study?.collaborators.map(c => c.id).includes(user.id);

          let study;
          if (needToClone && !adminMode) {
            study = {
              ...data.study,
              consent: null,
              collaborators: [''],
              ...makeCloneNames(data.study.title),
            };
          } else if (isAuthor || adminMode) {
            study = {
              ...data.study,
              consent: data.study.consent?.id,
              collaborators: (data.study.collaborators &&
                data.study.collaborators.map(c => c.username).length &&
                data.study.collaborators.map(c => c.username)) || [''],
            };
          } else {
            study = {
              ...data.study,
              consent: null,
              collaborators: [''],
              ...makeCloneNames(data.study.title),
            };
          }

          return (
            <EmptyPage>
              <StudyBuilder
                onLeave={this.props.onLeave}
                study={study}
                user={this.props.user}
                needToClone={needToClone}
                adminMode={adminMode}
              />
            </EmptyPage>
          );
        }}
      </Query>
    );
  }
}

export default StudyBuilderWrapper;
export { PROJECT_QUERY };
