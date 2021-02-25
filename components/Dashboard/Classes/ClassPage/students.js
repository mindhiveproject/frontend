import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Error from '../../../ErrorMessage/index';

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
  grid-template-columns: 1fr 1fr 50px;
  background: white;
`;

class ClassStudents extends Component {
  render() {
    const { students } = this.props;
    return (
      <div>
        <StyledStudentsTop>
          <div>
            <p>
              Share the link below with your students to invite them to join
              your class
            </p>
            <p>In development... 🚧👷🏻‍♂️</p>
          </div>
          <div>
            <p>Class access code</p>
            <h2>{this.props.code}</h2>
          </div>
        </StyledStudentsTop>

        <StyledStudentHeader>
          <div>Student/Username</div>
          <div>Email address</div>
          <div>Actions</div>
        </StyledStudentHeader>

        {students.map((student, i) => {
          const email =
            (student.authEmail.length && student.authEmail[0].email) || '';
          return (
            <StyledStudentRow key={i}>
              <div>{student.username}</div>
              <div>{email}</div>
              <div>...</div>
            </StyledStudentRow>
          );
        })}
      </div>
    );
  }
}

export default ClassStudents;
