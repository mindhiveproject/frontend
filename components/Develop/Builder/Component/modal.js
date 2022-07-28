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
    const { user, componentID, adminMode, needToClone } = this.props;

    return (
      <div className="modal">
        <Query query={COMPONENT_TO_CLONE_QUERY} variables={{ id: componentID }}>
          {({ data, loading }) => {
            if (loading) return <p>Loading ... </p>;
            if (!data || !data.task)
              return <p>No task found for id {this.props.componentID}</p>;

            const isAuthor =
              user.id === data.task?.author?.id ||
              data.task?.collaborators.map(c => c.id).includes(user.id);

            // check whether the current user is the author of the original task or the collaborator on the task
            const isTemplateAuthor =
              user.id === data.task?.template?.author?.id ||
              data.task?.collaborators.map(c => c.id).includes(user.id);

            let task;
            if (needToClone && !adminMode) {
              task = {
                ...data.task,
                templateId: data.task.template.id,
                consent: null,
                collaborators: [''],
                ...makeCloneNames(data.task.title),
                isOriginal: false, // switch to false as it should be cloned
              };
            } else if (isAuthor || adminMode) {
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

            return <ComponentBuilder {...this.props} task={task} />;
          }}
        </Query>
      </div>
    );
  }
}

export default ComponentModal;
