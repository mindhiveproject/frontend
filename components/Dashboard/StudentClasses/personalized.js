import React, { Component } from 'react';
import Classes from './classes';
import ClassPage from './classpage';
import AddClass from './addclass';

import AuthorizedPage from '../../Page/userpage';

import AssignmentPage from './Assignment/assignmentPage';

class DashboardStudentClasses extends Component {
  state = {
    page: this.props.page || 'classes', // classes: all classes, classpage: page of the class, addclass: page to add a new class
    classId: null,
    assignmentId: this.props.assignmentId || null,
  };

  componentDidUpdate(prevProps) {
    if (this.props.assignmentId !== prevProps.assignmentId) {
      this.setState({
        assignmentId: this.props.assignmentId,
      });
    }
  }

  addClass = () => {
    this.setState({
      page: 'addclass',
    });
  };

  openClass = classId => {
    this.setState({
      page: 'classpage',
      classId,
      assignmentId: null,
    });
  };

  goBack = () => {
    this.setState({
      page: 'classes',
      classId: null,
      assignmentId: null,
    });
  };

  render() {
    const page = this.state.assignmentId ? this.props.page : this.state.page;

    if (page === 'classes') {
      return (
        <AuthorizedPage>
          <Classes addClass={this.addClass} openClass={this.openClass} />
        </AuthorizedPage>
      );
    }

    if (page === 'classpage') {
      return (
        <AuthorizedPage>
          <ClassPage classId={this.state.classId} goBack={this.goBack} />
        </AuthorizedPage>
      );
    }

    if (page === 'addclass') {
      return <AddClass goBack={this.goBack} />;
    }

    if (page === 'assignment') {
      return (
        <AuthorizedPage>
          <AssignmentPage
            goToClass={this.openClass}
            assignmentId={this.props.assignmentId}
            backButtonText="📝 See all assignments of this class"
            userClasses={this.props.user?.studentIn.map(c => c?.id)}
          />
        </AuthorizedPage>
      );
    }
  }
}

export default DashboardStudentClasses;
