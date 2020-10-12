import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Card from './card';

import { StyledSelectionScreen } from '../selectScreen';

const StyledBankToClone = styled.div`
  display: grid;
  justify-content: center;
  margn: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(315px, 1fr));
  grid-gap: 20px;
  margin: 20px;
  width: 100vh;
`;

const ALL_PUBLIC_TASKS_TO_CLONE_QUERY = gql`
  query ALL_PUBLIC_TASKS_TO_CLONE_QUERY {
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
      description
      taskType
      parameters
      template {
        id
        title
        description
        parameters
        script
        style
      }
    }
  }
`;

const ALL_PUBLIC_SURVEYS_TO_CLONE_QUERY = gql`
  query ALL_PUBLIC_SURVEYS_TO_CLONE_QUERY {
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
      description
      taskType
      parameters
      template {
        id
        title
        description
        parameters
        script
        style
      }
    }
  }
`;

class ChooseComponentToClone extends Component {
  onSelectTask = task => {
    this.props.onChoiceToClone(task);
  };

  render() {
    const { componentType } = this.props;
    const component = componentType === 'SURVEY' ? 'survey' : 'task';
    return (
      <StyledSelectionScreen>
        <div className="selectionHeader">
          <div className="goBackBtn">
            <span onClick={this.props.onReturn}>
              ← Go back to previous step
            </span>
          </div>
          <div className="closeBtn">
            <span onClick={this.props.onClose}>&times;</span>
          </div>
        </div>

        <div className="selectionBody">
          <div className="selectHeader">
            <h1>Clone & modify a {component}</h1>
            <p>Select which {component} you would like to clone below.</p>
          </div>

          <Query
            query={
              componentType === 'SURVEY'
                ? ALL_PUBLIC_SURVEYS_TO_CLONE_QUERY
                : ALL_PUBLIC_TASKS_TO_CLONE_QUERY
            }
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { tasks } = data;
              return (
                <StyledBankToClone>
                  {tasks.map(task => (
                    <Card
                      key={task.id}
                      task={task}
                      onSelectTask={this.onSelectTask}
                      user={this.props.user}
                    />
                  ))}
                </StyledBankToClone>
              );
            }}
          </Query>
        </div>
      </StyledSelectionScreen>
    );
  }
}

export default ChooseComponentToClone;
