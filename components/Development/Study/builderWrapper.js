import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import slugify from 'slugify';
import StudyBuilder from './builder';
import EmptyPage from '../../Page/empty';

const STUDY_QUERY = gql`
  query STUDY_QUERY($id: ID!) {
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
    const { user, needToClone, readOnlyMode } = this.props;
    return (
      <Query query={STUDY_QUERY} variables={{ id: this.props.studyId }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.study)
            return <h1>No study found for id {this.props.studyId}</h1>;

          const isAuthor =
            user.id === data.study?.author?.id ||
            data.study?.collaborators.map(c => c.id).includes(user.id);

          let study;
          if (needToClone && !readOnlyMode) {
            study = {
              ...data.study,
              consent: null,
              collaborators: [''],
              ...makeCloneNames(data.study.title),
            };
          } else if (isAuthor || readOnlyMode) {
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
                readOnlyMode={readOnlyMode}
              />
            </EmptyPage>
          );
        }}
      </Query>
    );
  }
}

export default StudyBuilderWrapper;
export { STUDY_QUERY };
