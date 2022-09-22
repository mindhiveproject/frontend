import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Query } from '@apollo/client/react/components';

import ReactHtmlParser from 'react-html-parser';

import HomeworkWrapper from '../Homework/wrapper';

import { GET_ONE_ASSIGNMENT } from '../../../Queries/Assignment';
import { GET_ASSIGNMENT_HOMEWORKS } from '../../../Queries/Homework';

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
    padding: 25px 20px 20px 20px;
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
    margin: 0.2rem 0rem;
    border-radius: 1rem;
    cursor: pointer;
    box-shadow: 0px 2px 4px 0px #00000026;
    transition: box-shadow 300ms ease-out;
    :hover {
      box-shadow: 0px 2px 24px 0px #0000001a;
    }
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
        <Query query={GET_ONE_ASSIGNMENT} variables={{ id: assignmentId }}>
          {({ data: assignmentData, loading: assignmentLoading }) => {
            if (assignmentLoading) return <p>Loading ... </p>;
            if (!assignmentData || !assignmentData.assignment)
              return <h2>No assignment found</h2>;
            const { assignment } = assignmentData;

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

                <Query
                  query={GET_ASSIGNMENT_HOMEWORKS}
                  variables={{ id: assignmentId }}
                >
                  {({ data: homeworkData, loading: homeworkLoading }) => {
                    if (homeworkLoading) return <p>Loading ... </p>;
                    if (
                      !homeworkData ||
                      !homeworkData.homeworks ||
                      !homeworkData?.homeworks?.length
                    )
                      return (
                        <h2>
                          No homework submitted for assignment{' '}
                          <i>{assignment.title}</i>
                        </h2>
                      );
                    const { homeworks } = homeworkData;
                    return (
                      <StyledHomeworkList>
                        <h2>Submitted homework</h2>
                        {page === 'homework' && (
                          <HomeworkWrapper
                            assignmentTitle={assignment?.title}
                            homeworkId={homeworkId}
                            goBack={this.goBack}
                          />
                        )}
                        {page === 'assignment' && (
                          <div>
                            {homeworks.map(work => (
                              <div
                                className="homeworkTab"
                                onClick={() => this.openHomework(work?.id)}
                              >
                                <div>{work?.title}</div>
                                <div>
                                  {moment(work?.createdAt).format(
                                    'MMM D, YYYY'
                                  )}
                                </div>
                                <div>{work?.author?.username}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </StyledHomeworkList>
                    );
                  }}
                </Query>
              </StyledAssignment>
            );
          }}
        </Query>
      </StyledEditor>
    );
  }
}

export default Assignment;
