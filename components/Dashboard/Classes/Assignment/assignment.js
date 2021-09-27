import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import ReactHtmlParser from 'react-html-parser';

import Homework from '../Homework/homework';

const GET_ASSIGNMENT_HOMEWORKS = gql`
  query GET_ASSIGNMENT_HOMEWORKS($id: ID!) {
    assignment(where: { id: $id }) {
      id
      title
      content
      homework {
        id
        title
        author {
          username
        }
        createdAt
      }
    }
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

const StyledHomeworkList = styled.div`
  display: grid;
  .homeworkTab {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background: white;
    padding: 1rem;
    border-radius: 1rem;
    cursor: pointer;
  }
`;

const StyledAssignment = styled.div`
  display: grid;
  grid-gap: 2rem;
`;

class Assignment extends Component {
  state = {
    page: this.props.page || 'assignment',
    assignmentId: null,
  };

  openHomework = homeworkId => {
    this.setState({
      page: 'homework',
      homeworkId,
    });
  };

  goBack = () => {
    this.setState({
      page: 'assignment',
      homeworkId: null,
    });
  };

  render() {
    const { assignmentId } = this.props;
    const { page, homeworkId } = this.state;

    return (
      <StyledEditor>
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
            const { homework } = assignment;
            return (
              <StyledAssignment>
                <StyledPost>
                  <div className="header">
                    <h2>{assignment.title}</h2>
                  </div>
                  <div className="content">
                    {ReactHtmlParser(assignment.content)}
                  </div>
                </StyledPost>
                <StyledHomeworkList>
                  <h2>Submitted homework</h2>
                  {page === 'homework' && (
                    <Homework goBack={this.goBack} homeworkId={homeworkId} />
                  )}
                  {page === 'assignment' && (
                    <div>
                      {homework.map(work => (
                        <div
                          className="homeworkTab"
                          onClick={() => this.openHomework(work?.id)}
                        >
                          <div>{work?.title}</div>
                          <div>
                            {moment(work?.createdAt).format('MMM D, YYYY')}
                          </div>
                          <div>{work?.author?.username}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </StyledHomeworkList>
              </StyledAssignment>
            );
          }}
        </Query>
      </StyledEditor>
    );
  }
}

export default Assignment;
