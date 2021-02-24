import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Error from '../../../ErrorMessage/index';

const StyledStudentRow = styled.div`
  display: grid;
  margin: 5px;
  padding: 20px;
  grid-template-columns: 1fr 1fr auto;
  background: white;
`;

class ClassStudents extends Component {
  render() {
    const { students } = this.props;
    console.log('students', students);
    return (
      <div>
        <div>
          <p>
            Share the link below with your students to invite them to join your
            class
          </p>
          <p>In development...</p>
        </div>
        <div>
          <p>Class access code</p>
          <h3>{this.props.code}</h3>
        </div>

        <h2>Students of this class</h2>

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
