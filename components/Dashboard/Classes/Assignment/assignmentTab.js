import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Icon, Popup } from 'semantic-ui-react';

import { Mutation } from '@apollo/client/react/components';

import ReactHtmlParser from 'react-html-parser';
import DeleteAssignment from './deleteAssignment';

import { GET_ASSIGNMENT, UPDATE_ASSIGNMENT } from './editAssignment';
import { CLASS_ASSIGNMENTS } from './wrapper';

const StyledPost = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background: white;
  border-radius: 1rem;
  margin: 0.5rem 0rem;
  .header {
    padding: 25px 20px 10px 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr;
    align-items: center;
    .firstLine {
      display: grid;
      grid-gap: 2rem;
      grid-template-columns: 1fr auto;
      .title {
        display: grid;
        grid-gap: 2rem;
        grid-template-columns: auto 1fr;
        align-items: baseline;
      }
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
      max-width: 300px;
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
    .secondary {
      background: white;
      color: #007c70;
    }
  }
  .headerInfo {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr auto;
    .buttons {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: 1rem;
    }
  }
  .content {
    padding: 15px 20px 20px 20px;
  }
  span {
    cursor: pointer;
  }
`;

class AssignmentTab extends Component {
  state = {
    id: this.props.assignment.id,
    public: true,
  };

  copyLink = () => {
    const copyLink = `https://mindhive.science/dashboard/myclasses/assignments/${this.props.assignment.id}`;
    const temp = document.createElement('input');
    document.body.append(temp);
    temp.value = copyLink;
    temp.select();
    document.execCommand('copy');
    temp.remove();
    alert('The link is copied');
  };

  render() {
    const { assignment, classId } = this.props;
    return (
      <StyledPost>
        <div className="header">
          <div className="firstLine">
            <div>
              <div className="title">
                <h2>{assignment.title}</h2>

                {assignment.public ? (
                  <Popup
                    content="The assignment is visible for students"
                    trigger={<Icon name="eye" />}
                  />
                ) : (
                  <Popup
                    content="The assignment is NOT visible for students"
                    trigger={<Icon name="eye slash" />}
                  />
                )}
              </div>
              <em>{moment(assignment.createdAt).format('MMM D, YYYY')}</em>
            </div>

            <div className="title">
              {assignment.public ? (
                <button className="secondary" onClick={() => this.copyLink()}>
                  Copy link
                </button>
              ) : (
                <div></div>
              )}

              <DeleteAssignment assignmentId={assignment?.id} classId={classId}>
                <button className="secondary">Delete</button>
              </DeleteAssignment>
            </div>
          </div>

          <div className="headerInfo">
            {assignment.public ? (
              <button onClick={() => this.props.openAssignment(assignment.id)}>
                Homework
              </button>
            ) : (
              <div className="buttons">
                <button
                  className="secondary"
                  onClick={() => this.props.editAssignment(assignment.id)}
                >
                  Edit
                </button>

                <Mutation
                  mutation={UPDATE_ASSIGNMENT}
                  variables={this.state}
                  refetchQueries={[
                    {
                      query: CLASS_ASSIGNMENTS,
                      variables: { id: this.props.classId },
                    },
                    {
                      query: GET_ASSIGNMENT,
                      variables: { id: this.props.assignment.id },
                    },
                  ]}
                >
                  {(submitAssignment, { loading, error }) => (
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            'Are you sure you want to submit this assignment? The assignment can no longer be edited after it has been submitted.'
                          )
                        ) {
                          submitAssignment().catch(err => {
                            alert(err.message);
                          });
                        }
                      }}
                    >
                      Submit
                    </button>
                  )}
                </Mutation>
              </div>
            )}
          </div>
        </div>

        <div className="content">{ReactHtmlParser(assignment.content)}</div>
      </StyledPost>
    );
  }
}

export default AssignmentTab;
