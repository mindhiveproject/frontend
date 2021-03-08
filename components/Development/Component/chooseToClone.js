import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Card from './Card/index';

import { StyledSelectionScreen } from '../styles';

const StyledBankToClone = styled.div`
  display: grid;
  justify-content: center;
  margn: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  margin: 10px;
  width: 100vh;
  justify-self: center;
`;

const MY_AND_ALL_PUBLIC_TASKS_TO_CLONE_QUERY = gql`
  query MY_AND_ALL_PUBLIC_TASKS_TO_CLONE_QUERY {
    myAndAllTasks(where: { taskType: TASK }) {
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
      link
    }
  }
`;

const MY_AND_ALL_PUBLIC_SURVEYS_TO_CLONE_QUERY = gql`
  query MY_AND_ALL_PUBLIC_SURVEYS_TO_CLONE_QUERY {
    myAndAllTasks(where: { taskType: SURVEY }) {
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
      link
    }
  }
`;

// const ALL_PUBLIC_TASKS_TO_CLONE_QUERY = gql`
//   query ALL_PUBLIC_TASKS_TO_CLONE_QUERY {
//     tasks(where: { taskType: TASK }) {
//       id
//       title
//       slug
//       author {
//         id
//       }
//       collaborators {
//         id
//         username
//       }
//       public
//       description
//       taskType
//       parameters
//       template {
//         id
//         title
//         description
//         parameters
//         script
//         style
//       }
//       link
//     }
//   }
// `;

// const ALL_PUBLIC_SURVEYS_TO_CLONE_QUERY = gql`
//   query ALL_PUBLIC_SURVEYS_TO_CLONE_QUERY {
//     tasks(where: { taskType: SURVEY }) {
//       id
//       title
//       slug
//       author {
//         id
//       }
//       collaborators {
//         id
//         username
//       }
//       public
//       description
//       taskType
//       parameters
//       template {
//         id
//         title
//         description
//         parameters
//         script
//         style
//       }
//       link
//     }
//   }
// `;

class ChooseComponentToClone extends Component {
  onSelectComponent = component => {
    this.props.onChoiceToClone(component);
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
                ? MY_AND_ALL_PUBLIC_SURVEYS_TO_CLONE_QUERY
                : MY_AND_ALL_PUBLIC_TASKS_TO_CLONE_QUERY
            }
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { myAndAllTasks } = data;
              return (
                <StyledBankToClone>
                  {myAndAllTasks.map(component => (
                    <Card
                      key={component.id}
                      component={component}
                      onSelectComponent={this.onSelectComponent}
                      user={this.props.user}
                      showDeveloperInfo
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
