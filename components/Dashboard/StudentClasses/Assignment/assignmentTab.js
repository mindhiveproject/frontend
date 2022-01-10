import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import ReactHtmlParser from 'react-html-parser';

import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import DeleteAssignment from './deleteAssignment';

import HomeworkTab from '../Homework/homeworkTab';

export const MY_ASSIGNMENT_HOMEWORKS = gql`
  query MY_ASSIGNMENT_HOMEWORKS($id: ID!) {
    homeworks(where: { assignment: { id: $id } }) {
      id
      title
      content
      settings
      createdAt
      updatedAt
    }
  }
`;

const StyledPost = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background: white;
  border-radius: 1rem;
  .header {
    padding: 30px 20px 20px 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr;
    align-items: center;
    .secondary {
      background: white;
      color: #007c70;
    }
    button {
      min-height: 56px;
      padding: 10px 24px 10px 24px;
      background: #007c70;
      border: 2px solid #007c70;
      box-sizing: border-box;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      font-family: 'Lato';
    }
    .closeBtn {
      line-height: 3rem;
      text-align: center;
      cursor: pointer;
      border-radius: 2.25rem;
      color: #5f6871;
      font-size: 2rem;
      cursor: pointer;
      :hover {
        transform: scale(1.5);
        transition: transform 0.5s;
        color: red;
      }
    }
  }
  .headerInfo {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr auto auto;
    padding: 0rem 0rem 1rem 0rem;
    border-bottom: 1px solid lightgrey;
  }
  .content {
    padding: 15px 20px 20px 20px;
  }
`;

class AssignmentTab extends Component {
  render() {
    const { assignment, classId } = this.props;
    return (
      <StyledPost>
        <div className="header">
          <div>
            <h2>{assignment.title}</h2>
          </div>
          <div className="headerInfo">
            <span>{moment(assignment.createdAt).format('MMMM D, YYYY')}</span>
            <button
              className="secondary"
              onClick={() => this.props.viewAssignment(assignment.id)}
            >
              View
            </button>
            <button onClick={() => this.props.workOnAssignment(assignment.id)}>
              New homework
            </button>
          </div>

          <Query
            query={MY_ASSIGNMENT_HOMEWORKS}
            variables={{ id: assignment.id }}
          >
            {({ error, loading, data }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading</p>;
              if (!data.homeworks || data.homeworks.length === 0)
                return <p>No homework found for this assignment</p>;
              const { homeworks } = data;
              return (
                <>
                  {homeworks.map(homework => (
                    <HomeworkTab
                      homework={homework}
                      openHomework={this.props.openHomework}
                      assignmentId={assignment.id}
                    />
                  ))}
                </>
              );
            }}
          </Query>
        </div>
      </StyledPost>
    );
  }
}

export default AssignmentTab;
