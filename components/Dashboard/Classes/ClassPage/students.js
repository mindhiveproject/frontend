import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Dropdown, Menu } from 'semantic-ui-react';
import { Mutation, Query } from 'react-apollo';
import Error from '../../../ErrorMessage/index';

import { EXPEL_CLASS_MUTATION } from '../../../Class/Leave/remove';
import { MOVE_TO_CLASS_MUTATION } from '../../../Class/Leave/move';
import { REVIEW_CLASS_QUERY } from '../classpage';
import { MY_CLASSES_QUERY } from '../classes';

const StyledStudentsTop = styled.div`
  display: grid;
  margin-bottom: 20px;
  padding: 20px;
  grid-template-columns: 1fr 1fr;
  background: white;
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
                          <p>In development... 🚧👷🏻‍♂️</p>
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
                            <div>{student.username}</div>
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
