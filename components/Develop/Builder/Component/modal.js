import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import slugify from 'slugify';
import ComponentBuilder from './builder';

import { COMPONENT_TO_CLONE_QUERY } from '../../../Queries/Component';

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

class ComponentModal extends Component {
  render() {
    const { user, componentID } = this.props;

    return (
      <Query query={COMPONENT_TO_CLONE_QUERY} variables={{ id: componentID }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.task)
            return <p>No task found for id {this.props.componentID}</p>;

          // check whether the current user is the author of the task or the collaborator on the task
          const isAuthor =
            user.id === data.task?.author?.id ||
            data.task?.collaborators.map(c => c.id).includes(user.id);

          // console.log('isAuthor', isAuthor);

          let task;

          if (isAuthor) {
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
              isOriginal: false, // switch to false as it should be cloned
            };
          }

          // console.log('task', task);

          return (
            <ComponentBuilder {...this.props} task={task} isAuthor={isAuthor} />
          );
        }}
      </Query>
    );
  }
}

export default ComponentModal;
