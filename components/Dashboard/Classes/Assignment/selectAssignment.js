import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';
import moment from 'moment';

export const TEMPLATE_ASSIGNMENTS = gql`
  query TEMPLATE_ASSIGNMENTS {
    assignments(where: { isTemplate: true }) {
      id
      title
      content
      createdAt
      updatedAt
      author {
        username
      }
    }
  }
`;

const StyledSelectionScreen = styled.div`
  display: grid;
  background: #f7f9f8;
  .header {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .closeBtn {
    line-height: 3rem;
    text-align: center;
    cursor: pointer;
    border-radius: 2.25rem;
    color: #5f6871;
    font-size: 2rem;
    :hover {
      transform: scale(1.5);
      transition: transform 0.5s;
      color: red;
    }
  }
`;

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
  cursor: pointer;
  padding: 1.5rem 1rem;
  background: white;
  box-shadow: 0px 2px 4px 0px #00000026;
  transition: box-shadow 300ms ease-out;
  :hover {
    box-shadow: 0px 2px 24px 0px #0000001a;
  }
`;

const StyledAssignmentHeader = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  font-weight: bold;
`;

class SelectAssignment extends Component {
  render() {
    return (
      <StyledSelectionScreen>
        <div className="header">
          <div></div>
          <div className="closeBtn">
            <span onClick={this.props.goBack}>&times;</span>
          </div>
        </div>
        <Query query={TEMPLATE_ASSIGNMENTS}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { assignments } = data;
            return (
              <div>
                <p>Create a new assignment or select one from the list below</p>
                <div className="navigationHeader">
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gridGap: '10px',
                    }}
                  >
                    <button onClick={() => this.props.addAssignment()}>
                      Create a new assignment
                    </button>
                  </div>
                </div>

                <StyledAssignmentHeader>
                  <div>Title</div>
                  <div>Creator</div>
                  <div>Date created</div>
                  <div>Date updated</div>
                </StyledAssignmentHeader>
                <div></div>

                {assignments.map(assignment => (
                  <StyledRow
                    onClick={() => this.props.addAssignment(assignment)}
                  >
                    <div>{assignment?.title}</div>
                    <div>{assignment?.author?.username}</div>
                    <div>
                      {moment(assignment?.createdAt).format('MMMM D, YYYY')}
                    </div>
                    <div>
                      {moment(assignment?.updatedAt).format('MMMM D, YYYY')}
                    </div>
                  </StyledRow>
                ))}
              </div>
            );
          }}
        </Query>
      </StyledSelectionScreen>
    );
  }
}

export default SelectAssignment;
