import React, { Component } from "react";
import slugify from "slugify";
import styled from "styled-components";

const StyledBasicPane = styled.div`
  display: grid;
  grid-gap: 18px;
`;

class EditBasic extends Component {
  handleTitleChange = (e) => {
    const slug = slugify(e.target.value, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: /[^a-zA-Z\d\s:]/g, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
    });
    this.props.handleSetMultipleValuesInState({
      title: e.target.value,
      slug,
    });
  };

  render() {
    const { task, user } = this.props;

    const taskType =
      task?.taskType === "TASK"
        ? "Task"
        : task?.taskType === "BLOCK"
        ? "Block"
        : "Survey";

    const hasIRBAccess =
      user &&
      user?.permissions &&
      (user.permissions.includes("TEACHER") ||
        user.permissions.includes("SCIENTIST") ||
        user.permissions.includes("ADMIN"));

    // default settings for each task
    const settings = {
      mobileCompatible: false,
      descriptionBefore: "",
      descriptionAfter: "",
      background: "",
      duration: "",
      scoring: "",
      format: "",
      resources: "[]",
      aggregateVariables: "[]",
      addInfo: "",
      ...task.settings,
    };

    if (taskType === "Task") delete settings.scoring && delete settings.format;

    return (
      <StyledBasicPane>
        {task?.template?.id === "ckcvv5b8l0cg407215ot0jb5a" && (
          <div className="block">
            <label htmlFor="title">
              <h2>Title</h2>
              <p>
                The {taskType.toLowerCase()} title is visible to study
                participants
              </p>
              <input
                type="text"
                id="title"
                name="title"
                value={task.title}
                onChange={this.handleTitleChange}
                placeholder={`Insert ${taskType.toLowerCase()} title`}
              />
            </label>
          </div>
        )}

        <div className="block">
          <label htmlFor="title">
            <h2>Subtitle</h2>
            <p>
              The {taskType.toLowerCase()} subtitle is not visible to study
              participants. If you are running a between subject study, use the
              subtitle to distinguish blocks with the same title.
            </p>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={task.subtitle}
              onChange={this.props.handleTaskChange}
              placeholder={`Insert ${taskType.toLowerCase()} subtitle`}
            />
          </label>
        </div>

        {task?.isExternal && (
          <div className="block">
            <label htmlFor="link">
              <h2>External link</h2>
              <p>The data will not be saved to the MindHive database</p>
              <input
                type="text"
                id="link"
                name="link"
                value={task.link || ""}
                onChange={this.props.handleTaskChange}
                placeholder="Insert link"
              />
            </label>
          </div>
        )}
      </StyledBasicPane>
    );
  }
}

export default EditBasic;
