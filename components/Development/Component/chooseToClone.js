import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
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

const MY_AND_ALL_PUBLIC_BLOCKS_TO_CLONE_QUERY = gql`
  query MY_AND_ALL_PUBLIC_BLOCKS_TO_CLONE_QUERY {
    myAndAllTasks(where: { taskType: BLOCK }) {
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

class ChooseComponentToClone extends Component {
  onSelectComponent = component => {
    this.props.onChoiceToClone(component);
  };

  render() {
    const { componentType } = this.props;

    let component;
    switch (componentType) {
      case 'BLOCK':
        component = 'block';
        break;
      case 'SURVEY':
        component = 'survey';
        break;
      case 'TASK':
        component = 'task';
        break;
      default:
        console.error('No data specified');
    }

    let bankQuery;
    switch (componentType) {
      case 'BLOCK':
        bankQuery = MY_AND_ALL_PUBLIC_BLOCKS_TO_CLONE_QUERY;
        break;
      case 'SURVEY':
        bankQuery = MY_AND_ALL_PUBLIC_SURVEYS_TO_CLONE_QUERY;
        break;
      case 'TASK':
        bankQuery = MY_AND_ALL_PUBLIC_TASKS_TO_CLONE_QUERY;
        break;
      default:
        console.error('No query specified');
    }

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

          <Query query={bankQuery}>
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
