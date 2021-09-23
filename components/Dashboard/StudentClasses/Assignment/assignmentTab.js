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
  max-width: 450px;
  .header {
    padding: 15px 20px 20px 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr;
    align-items: center;
  }
  .headerInfo {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr auto auto;
    span {
      cursor: pointer;
    }
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
            <span onClick={() => this.props.viewAssignment(assignment.id)}>
              View
            </span>
            <span onClick={() => this.props.workOnAssignment(assignment.id)}>
              New homework
            </span>
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
