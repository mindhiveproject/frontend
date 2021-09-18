import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

import StudentPage from './page';

import { StyledDasboard, StyledDevelopDasboard } from '../../../styles';

const STUDENT_QUERY = gql`
  query STUDENT_QUERY($id: ID!) {
    student(id: $id) {
      id
      publicReadableId
      publicId
      username
      authEmail {
        email
      }
      image
      studiesInfo
      participantIn {
        title
        slug
      }
      researcherIn {
        title
        slug
        createdAt
      }
      collaboratorInStudy {
        title
        slug
        createdAt
      }
      reviews {
        study {
          slug
          title
        }
      }
    }
  }
`;

class FetchStudentPage extends Component {
  render() {
    return (
      <StyledDasboard>
        <StyledDevelopDasboard>
          <div className="goBackBtn">
            <span
              style={{ cursor: 'pointer' }}
              onClick={this.props.goBackToList}
            >
              ← Back
            </span>
          </div>

          <Query query={STUDENT_QUERY} variables={{ id: this.props.studentId }}>
            {({ error, loading, data }) => {
              if (error) return <Error error={error} />;
              if (loading) return <div>Loading ...</div>;
              if (!data.student)
                return <p>No student found for {this.props.studentId}</p>;
              const { student } = data;
              return (
                <StudentPage
                  student={student}
                  adminMode={this.props.adminMode}
                />
              );
            }}
          </Query>
        </StyledDevelopDasboard>
      </StyledDasboard>
    );
  }
}

export default FetchStudentPage;
