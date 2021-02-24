import React, { Component } from 'react';
import Classes from './classes';
import ClassPage from './classpage';
import AddClass from './addclass';

import AuthorizedPage from '../../Page/userpage';

class DashboardClasses extends Component {
  state = {
    page: this.props.page || 'classes', // classes: all classes, classpage: page of the class, addclass: page to add a new class
    classId: null,
  };

  addClass = () => {
    this.setState({
      page: 'addclass',
    });
  };

  openClass = classId => {
    this.setState({
      page: 'classpage',
      classId,
    });
  };

  goBack = () => {
    this.setState({
      page: 'classes',
      classId: null,
    });
  };

  render() {
    const { page } = this.state;

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
  }
}

export default DashboardClasses;
