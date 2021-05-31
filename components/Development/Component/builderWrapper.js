import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';
import slugify from 'slugify';

import ComponentBuilder from './builder';

import {
  StyledStudyBuilder,
  StudyBuilderNav,
  StyledEditPane,
  StyledPreviewPane,
  StyledStudyBuilderPage,
} from './styles';

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

const COMPONENT_TO_CLONE_QUERY = gql`
  query COMPONENT_TO_CLONE_QUERY($id: ID!) {
    task(where: { id: $id }) {
      id
      title
      slug
      description
      parameters
      settings
      updatedAt
      link
      author {
        id
      }
      template {
        id
        title
        description
        parameters
        script
        style
        author {
          id
        }
        createdAt
        updatedAt
      }
      collaborators {
        id
        username
      }
      consent {
        id
        title
      }
      taskType
      public
      submitForPublishing
      isOriginal
      isExternal
      link
    }
  }
`;

class ComponentBuilderWrapper extends Component {
  render() {
    const { user, needToClone, readOnlyMode } = this.props;

    return (
      <Query
        query={COMPONENT_TO_CLONE_QUERY}
        variables={{ id: this.props.componentId }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.task)
            return <p>No task found for id {this.props.id}</p>;

          const isAuthor =
            user.id === data.task?.author?.id ||
            data.task?.collaborators.map(c => c.id).includes(user.id);

          // check whether the current user is the author of the original task
          const isTemplateAuthor = user.id === data.task?.template?.author?.id;

          let task;
          if (needToClone) {
            task = {
              ...data.task,
              templateId: data.task.template.id,
              consent: null,
              collaborators: [''],
              ...makeCloneNames(data.task.title),
              isOriginal: false, // switch to false as it should be cloned
            };
          } else if (isAuthor) {
            task = {
              ...data.task,
              templateId: data.task.template?.id,
              consent: data.task.consent?.id,
              collaborators: (data.task.collaborators &&
                data.task.collaborators.map(c => c.username).length &&
                data.task.collaborators.map(c => c.username)) || [''],
            };
          } else {
            task = {
              ...data.task,
              templateId: data.task.template.id,
              consent: null,
              collaborators: [''],
              ...makeCloneNames(data.task.title),
            };
          }

          return (
            <ComponentBuilder
              onLeave={this.props.onLeave}
              task={task}
              user={this.props.user}
              needToClone={needToClone}
              templateEditor={
                isAuthor && isTemplateAuthor && !needToClone && task.isOriginal
              }
              readOnlyMode={readOnlyMode}
            />
          );
        }}
      </Query>
    );
  }
}

export default ComponentBuilderWrapper;
export { COMPONENT_TO_CLONE_QUERY };
