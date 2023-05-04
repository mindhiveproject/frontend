import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";

import slugify from "slugify";
// preview the task (for using)
import { create } from "lodash";
import ComponentContainer from "./container.js";

// ToDo: decide what to show based on whether the user is the author or
// collaborator on the task

import { COMPONENT_TO_CLONE_QUERY } from "../../../Queries/Component";

const makeCloneNames = (title) => {
  const randomNumber = Math.floor(Math.random() * 10000);
  const newTitle = `Clone of ${title}-${randomNumber}`;
  const slug = slugify(newTitle, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: /[^a-zA-Z\d\s:]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
  });
  return { slug, title: newTitle };
};

class ComponentModal extends Component {
  render() {
    const { user, componentID, node } = this.props;

    return (
      <Query query={COMPONENT_TO_CLONE_QUERY} variables={{ id: componentID }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.task)
            return <p>No task found for id {this.props.componentID}</p>;

          // check whether the current user is the author of the task or the collaborator on the task
          const isAuthor =
            user.id === data.task?.author?.id ||
            data.task?.collaborators.map((c) => c.id).includes(user.id);

          // check whether the task should be cloned
          const createCopy = node?.options?.createCopy;

          let task;

          if (isAuthor && !createCopy) {
            task = {
              ...data.task,
              templateId: data.task.template?.id,
              consent: data.task.consent?.id,
              collaborators: (data.task.collaborators &&
                data.task.collaborators.map((c) => c.username).length &&
                data.task.collaborators.map((c) => c.username)) || [""],
            };
          } else if (createCopy) {
            task = {
              ...data.task,
              templateId: data.task.template.id,
              consent: null,
              collaborators: [""],
              isOriginal: false, // switch to false as it should be cloned
              subtitle: node?.options?.subtitle,
            };
          } else {
            task = {
              ...data.task,
              templateId: data.task.template.id,
              consent: null,
              collaborators: [""],
              isOriginal: false, // switch to false as it should be cloned
            };
          }

          return (
            <ComponentContainer
              {...this.props}
              component={task}
              isAuthor={isAuthor}
              createCopy={createCopy}
            />
          );
        }}
      </Query>
    );
  }
}

export default ComponentModal;
