import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag";

import { Dropdown } from "semantic-ui-react";
import { StyledBank } from "../styles";

import Card from "./card";

const ALL_PUBLIC_TASKS_QUERY = gql`
  query ALL_PUBLIC_TASKS_QUERY {
    tasks(where: { taskType: TASK }) {
      id
      title
      slug
      author {
        id
      }
      collaborators {
        id
        username
      }
      public
      descriptionForParticipants
      taskType
    }
  }
`;

const ALL_PUBLIC_SURVEYS_QUERY = gql`
  query ALL_PUBLIC_SURVEYS_QUERY {
    tasks(where: { taskType: SURVEY }) {
      id
      title
      slug
      author {
        id
      }
      collaborators {
        id
        username
      }
      public
      descriptionForParticipants
      taskType
    }
  }
`;

const ALL_PUBLIC_COMPONENTS_QUERY = gql`
  query ALL_PUBLIC_COMPONENTS_QUERY($taskType: TaskType) {
    tasks(where: { taskType: $taskType }, orderBy: title_ASC) {
      id
      title
      slug
      taskType
      author {
        id
      }
      collaborators {
        id
      }
    }
  }
`;

class TasksBank extends Component {
  state = {
    taskType: "ALL",
  };

  handleSelectTaskType = (event, data) => {
    this.setState({ taskType: data.value });
  };

  render() {
    const { componentType, user, redirect } = this.props;
    const taskType =
      this.state.taskType === "ALL" ? undefined : this.state.taskType;

    let bankQuery;
    switch (componentType) {
      case "COMPONENTS":
        bankQuery = ALL_PUBLIC_COMPONENTS_QUERY;
        break;
      case "SURVEY":
        bankQuery = ALL_PUBLIC_SURVEYS_QUERY;
        break;
      case "TASK":
        bankQuery = ALL_PUBLIC_TASKS_QUERY;
        break;
      default:
        console.error("No query specified");
    }

    return (
      <StyledBank>
        <div className="header">
          <div>
            <Dropdown
              selection
              options={[
                {
                  key: "all",
                  text: "All",
                  value: "ALL",
                },
                {
                  key: "task",
                  text: "Tasks",
                  value: "TASK",
                },
                {
                  key: "survey",
                  text: "Surveys",
                  value: "SURVEY",
                },
                {
                  key: "block",
                  text: "Blocks",
                  value: "BLOCK",
                },
              ]}
              onChange={this.handleSelectTaskType}
              value={this.state.taskType}
              className="createdByDropdown"
            />
          </div>

          <div>
            <a
              target="_blank"
              href="https://docs.google.com/document/d/1PjobN7C3LUDuiFUanZd7BuTGYRf5zq9t_CUGGKQjLyM/edit?usp=sharing"
              rel="noreferrer"
            >
              <button>Tasks and Surveys descriptions</button>
            </a>
          </div>
        </div>
        <Query query={bankQuery} variables={{ taskType }}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { tasks } = data;
            return (
              <div className="tasks">
                {tasks.map((component) => (
                  <Card
                    user={user}
                    key={component.id}
                    component={component}
                    redirect={redirect}
                    participateMode
                    isFavorite={user?.favoriteTasks
                      ?.map((task) => task?.id)
                      .includes(component?.id)}
                    onSelectTask={this.props.onSelectTask}
                  />
                ))}
              </div>
            );
          }}
        </Query>
      </StyledBank>
    );
  }
}

export default TasksBank;
