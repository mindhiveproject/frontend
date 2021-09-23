import React, { Component } from 'react';
import styled from 'styled-components';

import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import ReactHtmlParser from 'react-html-parser';

const GET_ASSIGNMENT = gql`
  query GET_ASSIGNMENT($id: ID!) {
    assignment(where: { id: $id }) {
      id
      title
      content
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
  .content {
    padding: 15px 20px 20px 20px;
  }
`;

const StyledEditor = styled.div`
  .header {
    display: grid;
    justify-content: end;
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
`;

class Assignment extends Component {
  render() {
    const { assignmentId } = this.props;
    return (
      <StyledEditor>
        <div className="header">
          <div className="closeBtn">
            <div onClick={this.props.goBack}>&times;</div>
          </div>
        </div>
        <Query
          query={GET_ASSIGNMENT}
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
      </StyledEditor>
    );
  }
}

export default Assignment;
