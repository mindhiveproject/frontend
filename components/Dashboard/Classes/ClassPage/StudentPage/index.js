import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";

import StudentPage from "./page";

import { StyledDasboard, StyledDevelopDasboard } from "../../../styles";

import { STUDENT_QUERY } from "../../../../Queries/User";

class FetchStudentPage extends Component {
  render() {
    const { studentId } = this.props;
    return (
      <StyledDasboard>
        <StyledDevelopDasboard>
          <div className="goBackBtn">
            <span
              style={{ cursor: "pointer" }}
              onClick={this.props.goBackToList}
            >
              ← Back
            </span>
          </div>

          <Query query={STUDENT_QUERY} variables={{ id: studentId }}>
            {({ error, loading, data }) => {
              if (error) return <div>{JSON.stringify(error)}</div>;
              if (loading) return <div>Loading ...</div>;
              if (!data.student) return <p>No student found for {studentId}</p>;
              const { student } = data;

              return (
                <StudentPage
                  student={student}
                  classId={this.props.classId}
                  isAdmin={this.props.isAdmin}
                  isEducationalResearcher={this.props.isEducationalResearcher}
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
