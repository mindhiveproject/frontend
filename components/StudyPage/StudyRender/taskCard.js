import React, { Component } from "react";
import PropTypes from "prop-types";

import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag";
import ReactHtmlParser from "react-html-parser";
import Error from "../../ErrorMessage/index";

import { StyledTaskCard } from "../../Bank/styles";

const COMPONENT_TYPE_QUERY = gql`
  query COMPONENT_TYPE_QUERY($id: ID!) {
    task(where: { id: $id }) {
      id
      taskType
      title
      settings
    }
  }
`;

class TaskCard extends Component {
  static propTypes = {
    taskCard: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { component } = this.props;

    return (
      <Query query={COMPONENT_TYPE_QUERY} variables={{ id: component?.id }}>
        {({ loading, error, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;

          const task = data && data?.task;
          const taskType = task?.taskType?.toLowerCase();

          return (
            <StyledTaskCard taskType={task.taskType}>
              <div className="cardInfo">
                <h2>{task.title}</h2>
                <p>
                  {task.settings &&
                    task.settings.duration &&
                    `Duration ${task.settings.duration}`}
                </p>

                <div>
                  {!this.props.completed &&
                    task.settings &&
                    ReactHtmlParser(task.settings.descriptionBefore)}
                </div>
                <div>
                  {this.props.completed &&
                    task.settings &&
                    ReactHtmlParser(task.settings.descriptionAfter)}
                </div>

                <div className="actionLinks">
                  <button
                    onClick={() =>
                      this.props.onStartTask(component.id, component.testId)
                    }
                  >
                    Take {taskType}
                  </button>
                </div>
              </div>
            </StyledTaskCard>
          );
        }}
      </Query>
    );
  }
}

export default TaskCard;
