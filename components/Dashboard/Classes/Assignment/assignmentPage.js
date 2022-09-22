import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';

import ClassPage from '../classpage';

import { GET_ONE_ASSIGNMENT } from '../../../Queries/Assignment';

class AssignmentPage extends Component {
  render() {
    return (
      <Query
        query={GET_ONE_ASSIGNMENT}
        variables={{ id: this.props.assignmentId }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.assignment) return <h2>No assignment found</h2>;
          const { assignment } = data;
          const schoolclass = assignment.classes[0];

          if (!this.props.userClasses.includes(schoolclass?.id)) {
            return (
              <div>
                <h2>No assignment found</h2>
                <p>
                  Please check if you are a teacher or a mentor of the class
                  with this assignment.
                </p>
              </div>
            );
          }

          return (
            <ClassPage
              classId={schoolclass?.id}
              goBack={() =>
                this.props.goToClassToTab(schoolclass?.id, 'assignments')
              }
              featuredAssignmentId={this.props.assignmentId}
              backButtonText={this.props.backButtonText}
              tab="assignments"
            />
          );
        }}
      </Query>
    );
  }
}

export default AssignmentPage;
