import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Error from '../../../ErrorMessage/index';

import Assignment from './assignment';
import AddAssignment from './addAssignment';
import AssignmentTab from './assignmentTab';
import Homework from './homework';

import EditHomework from '../Homework/editHomework';
import OpenHomework from '../Homework/openHomework';

export const CLASS_ASSIGNMENTS = gql`
  query CLASS_ASSIGNMENTS($id: ID!) {
    assignments(where: { classes_some: { id: $id }, public: true }) {
      id
      title
      settings
      createdAt
      updatedAt
    }
  }
`;

class ClassAssignments extends Component {
  state = {
    page: this.props.page || 'assignments',
    assignmentId: null,
    homeworkId: null,
    featuredAssignmentId: this.props.featuredAssignmentId || null,
  };

  addAssignment = () => {
    this.setState({
      page: 'addassignment',
    });
  };

  workOnAssignment = assignmentId => {
    this.setState({
      page: 'homework',
      assignmentId,
    });
  };

  viewAssignment = assignmentId => {
    this.setState({
      page: 'assignment',
      assignmentId,
    });
  };

  goBack = () => {
    this.setState({
      page: 'assignments',
      assignmentId: null,
      homeworkId: null,
    });
  };

  openHomework = homeworkId => {
    this.setState({
      page: 'openhomework',
      homeworkId,
    });
  };

  editHomework = homeworkId => {
    this.setState({
      page: 'edithomework',
      homeworkId,
    });
  };

  render() {
    const { schoolclass } = this.props;
    const { page, assignmentId, homeworkId, featuredAssignmentId } = this.state;

    if (page === 'assignment') {
      return (
        <Assignment
          goBack={this.goBack}
          classId={schoolclass?.id}
          assignmentId={assignmentId}
        />
      );
    }

    if (page === 'addassignment') {
      return <AddAssignment goBack={this.goBack} classId={schoolclass?.id} />;
    }

    if (page === 'homework') {
      return (
        <Homework
          goBack={this.goBack}
          classId={schoolclass?.id}
          assignmentId={assignmentId}
        />
      );
    }

    if (page === 'openhomework') {
      return <OpenHomework goBack={this.goBack} homeworkId={homeworkId} />;
    }

    if (page === 'edithomework') {
      return <EditHomework goBack={this.goBack} homeworkId={homeworkId} />;
    }

    if (page === 'assignments') {
      return (
        <>
          <div className="navigationHeader">
            <div></div>
          </div>
          <Query query={CLASS_ASSIGNMENTS} variables={{ id: schoolclass?.id }}>
            {({ error, loading, data }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading</p>;
              if (!data.assignments || data.assignments.length === 0)
                return (
                  <p>
                    No assignments found for{' '}
                    <strong>{schoolclass?.title}</strong>.
                  </p>
                );
              const { assignments } = data;
              return (
                <>
                  {assignments
                    .filter(assignment =>
                      featuredAssignmentId
                        ? assignment.id === featuredAssignmentId
                        : true
                    )
                    .map(assignment => (
                      <AssignmentTab
                        key={assignment.id}
                        assignment={assignment}
                        classId={schoolclass.id}
                        workOnAssignment={this.workOnAssignment}
                        viewAssignment={this.viewAssignment}
                        openHomework={this.openHomework}
                        editHomework={this.editHomework}
                        featuredAssignmentId={this.props.featuredAssignmentId}
                      />
                    ))}
                </>
              );
            }}
          </Query>
        </>
      );
    }
    return <div></div>;
  }
}

export default ClassAssignments;
