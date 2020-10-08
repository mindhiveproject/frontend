import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Link from 'next/link';
import styled from 'styled-components';
import { StyledBank, StyledStudyCard } from '../styles';
import TaskCard from './taskcard';

const StyledZeroState = styled.div`
  display: grid;
  justify-content: center;
  align-items: stretch;
  text-align: center;
  .message {
    margin-top: 180px;
    background: #fff3cd;
    border-radius: 4px;
    padding: 66px 86px 66px 86px;
  }
  h2 {
    font-family: Lato;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.05em;
    text-align: center;
  }
  p {
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.05em;
    text-align: center;
  }
`;

const MY_DEVELOPED_TASKS_QUERY = gql`
  query MY_DEVELOPED_TASKS_QUERY {
    myTasks {
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
    }
  }
`;

class DevelopedStudiesBank extends Component {
  render() {
    return (
      <>
        <Query query={MY_DEVELOPED_TASKS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const tasks = data.myTasks;
            if (tasks.length === 0) {
              return (
                <StyledZeroState>
                  <div className="message">
                    <h2>You haven't developed a task yet.</h2>
                    <p>
                      Once you develop your first task, it will appear here.
                    </p>
                  </div>
                </StyledZeroState>
              );
            }
            return (
              <StyledBank>
                <div className="studies">
                  {tasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onSelectTask={this.props.onSelectTask}
                      user={this.props.user}
                    />
                  ))}
                </div>
              </StyledBank>
            );
          }}
        </Query>
      </>
    );
  }
}

export default DevelopedStudiesBank;
