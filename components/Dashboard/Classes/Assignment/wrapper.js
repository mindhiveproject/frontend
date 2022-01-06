import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Error from '../../../ErrorMessage/index';

import Assignment from './assignment';
import SelectAssignment from './selectAssignment';
import AddAssignment from './addAssignment';
import AssignmentTab from './assignmentTab';
import EditAssignment from './editAssignment';

export const CLASS_ASSIGNMENTS = gql`
  query CLASS_ASSIGNMENTS($id: ID!) {
    assignments(where: { classes_some: { id: $id } }) {
      id
      title
      settings
      public
      createdAt
      updatedAt
    }
  }
`;

class ClassAssignments extends Component {
  state = {
    page: this.props.page || 'assignments',
    assignmentId: null,
    template: null,
  };

  // selecting an assignment template from the list or creating a new one
  selectAssignment = () => {
    this.setState({
      page: 'selectassignment',
    });
  };

  // adding a new assignment (based on the template or a new one)
  addAssignment = assignment => {
    console.log('assignment', assignment);
    this.setState({
      page: 'addassignment',
      template: assignment,
    });
  };

  editAssignment = assignmentId => {
    this.setState({
      page: 'editassignment',
      assignmentId,
    });
  };

  openAssignment = assignmentId => {
    this.setState({
      page: 'assignment',
      assignmentId,
    });
  };

  goBack = () => {
    this.setState({
      page: 'assignments',
      assignmentId: null,
      template: null,
    });
  };

  render() {
    const { schoolclass } = this.props;
    const { page, assignmentId } = this.state;

    if (page === 'selectassignment') {
      return (
        <SelectAssignment
          goBack={this.goBack}
          classId={schoolclass?.id}
          addAssignment={this.addAssignment}
        />
      );
    }

    if (page === 'addassignment') {
      return (
        <AddAssignment
          goBack={this.goBack}
          classId={schoolclass?.id}
          template={this.state.template}
        />
      );
    }

    if (page === 'assignment') {
      return (
        <Assignment
          goBack={this.goBack}
          classId={schoolclass?.id}
          assignmentId={assignmentId}
        />
      );
    }

    if (page === 'editassignment') {
      return (
        <EditAssignment
          goBack={this.goBack}
          classId={schoolclass?.id}
          assignmentId={assignmentId}
        />
      );
    }

    if (page === 'assignments') {
      return (
        <>
          <div className="navigationHeader">
            <div></div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridGap: '10px',
              }}
            >
              <button onClick={this.selectAssignment}>Add assignment</button>
            </div>
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
                  {assignments.map(assignment => (
                    <AssignmentTab
                      key={assignment.id}
                      assignment={assignment}
                      classId={schoolclass.id}
                      editAssignment={this.editAssignment}
                      openAssignment={this.openAssignment}
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
