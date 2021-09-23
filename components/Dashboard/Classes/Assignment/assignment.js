import React, { Component } from 'react';
import styled from 'styled-components';

import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import ReactHtmlParser from 'react-html-parser';

const GET_ASSIGNMENT_HOMEWORKS = gql`
  query GET_ASSIGNMENT_HOMEWORKS($id: ID!) {
    assignment(where: { id: $id }) {
      id
      title
      content
      homework {
        id
        title
        content
        author {
          username
        }
        createdAt
      }
    }
  }
`;

const StyledPost = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background: white;
  border-radius: 1rem;
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
  }
  .content {
    padding: 15px 20px 20px 20px;
  }
`;

class Assignment extends Component {
  render() {
    const { assignmentId } = this.props;
    return (
      <>
        <div className="header">
          <div className="closeBtn">
            <div onClick={this.props.goBack}>&times;</div>
          </div>
        </div>
        <Query
          query={GET_ASSIGNMENT_HOMEWORKS}
          variables={{ id: this.props.assignmentId }}
        >
          {({ data, loading }) => {
            if (loading) return <p>Loading ... </p>;
            if (!data || !data.assignment)
              return (
                <p>No assignment found for id {this.props.assignmentId}</p>
              );
            const { assignment } = data;
            return (
              <StyledPost>
                <div className="header">
                  <h2>{assignment.title}</h2>
                </div>
                <div className="content">
                  {ReactHtmlParser(assignment.content)}
                </div>
              </StyledPost>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Assignment;
