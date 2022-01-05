import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import styled from 'styled-components';

import AssignmentRow from './AssignmentList/index';
import { StyledDasboard, StyledClassesDasboard } from '../../styles';

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
`;

const StyledAssignmentHeader = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  cursor: pointer;
  font-weight: bold;
`;

// write a query here, later refactor it in a separate file if it is used elsewhere
const PUBLIC_ASSIGNMENTS_QUERY = gql`
  query PUBLIC_ASSIGNMENTS_QUERY {
    assignments(where: { isTemplate: true }) {
      id
      title
      createdAt
      updatedAt
      author {
        username
      }
    }
  }
`;

class Assignments extends Component {
  render() {
    return (
      <StyledDasboard>
        <StyledClassesDasboard>
          <h1>Assignment templates</h1>

          <Query query={PUBLIC_ASSIGNMENTS_QUERY}>
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { assignments } = data;
              if (assignments.length === 0) {
                return (
                  <>
                    <h3>You haven’t created any assignment templates yet.</h3>
                    <p>Once you create a template, it will appear here.</p>
                    <div className="navigationHeader">
                      <div></div>
                      <div>
                        <button onClick={this.props.addAssignment}>
                          Create Assignment Template
                        </button>
                      </div>
                    </div>
                  </>
                );
              }
              return (
                <>
                  <div className="navigationHeader">
                    <div></div>
                    <div>
                      <button onClick={this.props.addAssignment}>
                        Create Assignment Template
                      </button>
                    </div>
                  </div>
                  <div>
                    <StyledRow>
                      <StyledAssignmentHeader>
                        <div>Title</div>
                        <div>Creator</div>
                        <div>Date created</div>
                        <div>Date updated</div>
                      </StyledAssignmentHeader>
                      <div></div>
                    </StyledRow>

                    {assignments.map(assignment => (
                      <AssignmentRow
                        assignment={assignment}
                        key={assignment.id}
                        openAssignment={this.props.openAssignment}
                      />
                    ))}
                  </div>
                </>
              );
            }}
          </Query>
        </StyledClassesDasboard>
      </StyledDasboard>
    );
  }
}

export default Assignments;
export { PUBLIC_ASSIGNMENTS_QUERY };
