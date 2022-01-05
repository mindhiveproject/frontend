import React, { Component } from 'react';

import Assignments from './assignments';
import AddAssignment from './addassignment';
import AssignmentPage from './assignmentpage';

import AuthorizedPage from '../../../Page/userpage';

class DashboardAssignments extends Component {
  state = {
    page: this.props.page || 'assignments',
    assignment: null,
  };

  addAssignment = () => {
    this.setState({
      page: 'addassignment',
    });
  };

  openAssignment = assignment => {
    this.setState({
      page: 'assignmentpage',
      assignment,
    });
  };

  goBack = () => {
    this.setState({
      page: 'assignments',
      assignment: null,
    });
  };

  render() {
    const { page } = this.state;

    if (page === 'assignments') {
      return (
        <AuthorizedPage>
          <Assignments
            addAssignment={this.addAssignment}
            openAssignment={this.openAssignment}
          />
        </AuthorizedPage>
      );
    }

    if (page === 'assignmentpage') {
      return (
        <AuthorizedPage>
          <AssignmentPage
            assignment={this.state.assignment}
            goBack={this.goBack}
            assignmentTemplateMode
          />
        </AuthorizedPage>
      );
    }

    if (page === 'addassignment') {
      return (
        <AuthorizedPage>
          <AddAssignment goBack={this.goBack} />
        </AuthorizedPage>
      );
    }
  }
}

export default DashboardAssignments;
