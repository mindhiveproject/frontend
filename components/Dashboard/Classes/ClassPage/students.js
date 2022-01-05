import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Dropdown, Menu } from 'semantic-ui-react';
import { Mutation, Query } from '@apollo/client/react/components';
import Error from '../../../ErrorMessage/index';

import { EXPEL_CLASS_MUTATION } from '../../../Class/Leave/remove';
import { MOVE_TO_CLASS_MUTATION } from '../../../Class/Leave/move';
import { REVIEW_CLASS_QUERY } from '../classpage';
import { MY_CLASSES_QUERY } from '../classes';

const StyledStudentsTop = styled.div`
  display: grid;
  margin-bottom: 20px;
  padding: 20px;
  grid-template-columns: 2fr 1fr;
  grid-gap: 20px;
  background: white;
  .copyArea {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 20px;
    justify-items: baseline;
  }
  .link {
    padding: 12px 16px 12px 17px;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }
  .copyButton {
    padding: 12px 25px 12px 25px;
    cursor: pointer;
    color: #007c70;
    border: 2px solid #007c70;
    border-radius: 4px;
  }
`;

const StyledStudentHeader = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr 1fr 50px;
  font-weight: bold;
`;

const StyledStudentRow = styled.div`
  display: grid;
  padding: 10px;
  margin-bottom: 2px;
  grid-template-columns: 1fr 1fr 50px;
  background: white;
`;

class ClassStudents extends Component {
  removeFromClass = async (remove, classId, studentId) => {
    const res = await remove({
      variables: {
        classId,
        studentId,
      },
    });
  };

  changeTheClass = async (move, studentId, oldClassId, classId) => {
    const res = await move({
      variables: {
        classId,
        studentId,
      },
    });
    const { message } = res.data.moveToClass;
    alert(message);
  };

  copyLink = () => {
    const copyLink = `https://mindhive.science/signup/student/${this.props.schoolclass.code}`;
    const temp = document.createElement('input');
    document.body.append(temp);
    temp.value = copyLink;
    temp.select();
    document.execCommand('copy');
    temp.remove();
    alert('The link is copied');
  };

  render() {
    const { students } = this.props.schoolclass;

    return (
      <Mutation
        mutation={EXPEL_CLASS_MUTATION}
        refetchQueries={[
          {
            query: REVIEW_CLASS_QUERY,
            variables: {
              id: this.props.schoolclass.id,
            },
          },
        ]}
      >
        {(expelFromClass, { error }) => (
          <Mutation
            mutation={MOVE_TO_CLASS_MUTATION}
            refetchQueries={[
              {
                query: REVIEW_CLASS_QUERY,
                variables: {
                  id: this.props.schoolclass.id,
                },
              },
              {
                query: MY_CLASSES_QUERY,
              },
            ]}
          >
            {(moveToClass, { error }) => (
              <Query query={MY_CLASSES_QUERY}>
                {({ data, error, loading }) => {
                  if (loading) return <p>Loading ...</p>;
                  if (error) return <p>Error: {error.message}</p>;
                  const { myClasses } = data;
                  const otherClasses = myClasses.filter(
                    myClass => myClass.id !== this.props.schoolclass.id
                  );
                  return (
                    <div>
                      <StyledStudentsTop>
                        <div>
                          <p>
                            Share the link below with your students to invite
                            them to join your class
                          </p>
                          <div className="copyArea">
                            <div className="link">
                              https://mindhive.science/signup/student/
                              {this.props.schoolclass.code}
                            </div>
                            <div
                              className="copyButton"
                              onClick={() => this.copyLink()}
                            >
                              Copy
                            </div>
                          </div>
                        </div>
                        <div>
                          <p>Class access code</p>
                          <h2>{this.props.schoolclass.code}</h2>
                        </div>
                      </StyledStudentsTop>

                      <StyledStudentHeader>
                        <div>Student/Username</div>
                        <div>Email address</div>
                        <div>Actions</div>
                      </StyledStudentHeader>

                      {students.map((student, i) => {
                        const email =
                          (student.authEmail.length &&
                            student.authEmail[0].email) ||
                          '';
                        return (
                          <StyledStudentRow key={i}>
                            <div
                              style={{ cursor: 'pointer' }}
                              onClick={() =>
                                this.props.openStudentPage(student.id)
                              }
                            >
                              {student.username}
                            </div>
                            <div>{email}</div>
                            <Dropdown text="...">
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  name="remove"
                                  onClick={() =>
                                    this.removeFromClass(
                                      expelFromClass,
                                      this.props.schoolclass.id,
                                      student.id
                                    )
                                  }
                                >
                                  Remove from this class
                                </Dropdown.Item>
                                <Dropdown
                                  item
                                  text="Move to class"
                                  options={otherClasses.map(myClass => ({
                                    key: myClass.id,
                                    text: myClass.title,
                                    onClick: () =>
                                      this.changeTheClass(
                                        moveToClass,
                                        student.id,
                                        this.props.schoolclass.id,
                                        myClass.id
                                      ),
                                  }))}
                                />
                              </Dropdown.Menu>
                            </Dropdown>
                          </StyledStudentRow>
                        );
                      })}
                    </div>
                  );
                }}
              </Query>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default ClassStudents;
