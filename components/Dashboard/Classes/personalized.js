import React, { Component } from "react";
import Classes from "./classes";
import ClassPage from "./classpage";
import AddClass from "./addclass";

import AuthorizedPage from "../../Page/userpage";
import EmptyPage from "../../Page/empty";

import StudyBuilderWrapper from "../../Development/Study/builderWrapper";
import AssignmentPage from "./Assignment/assignmentPage";

class DashboardClasses extends Component {
  state = {
    page: this.props.page || "classes", // classes: all classes, classpage: page of the class, addclass: page to add a new class
    classId: null,
    assignmentId: this.props.assignmentId || null,
    tab: null,
    studyId: null,
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
      page: "addclass",
    });
  };

  openClass = (classId) => {
    this.setState({
      page: "classpage",
      classId,
      assignmentId: null,
    });
  };

  openClassTab = (classId, tab) => {
    this.setState({
      page: "classpage",
      classId,
      assignmentId: null,
      tab,
      studyId: null,
    });
  };

  goBack = () => {
    this.setState({
      page: "classes",
      classId: null,
      assignmentId: null,
    });
  };

  openStudyBuilder = (studyId) => {
    this.setState({
      page: "studyBuilder",
      studyId,
    });
  };

  render() {
    const page = this.state.assignmentId ? this.props.page : this.state.page;

    const userClassesIds = [
      ...this.props.user?.teacherIn.map((c) => c?.id),
      ...this.props.user?.mentorIn.map((c) => c?.id),
    ];

    if (page === "classes") {
      return (
        <AuthorizedPage>
          <Classes addClass={this.addClass} openClass={this.openClass} />
        </AuthorizedPage>
      );
    }

    if (page === "classpage") {
      return (
        <AuthorizedPage>
          <ClassPage
            classId={this.state.classId}
            tab={this.state.tab}
            goBack={this.goBack}
            openStudyBuilder={this.openStudyBuilder}
            user={this.props.user}
          />
        </AuthorizedPage>
      );
    }

    if (page === "addclass") {
      return <AddClass goBack={this.goBack} />;
    }

    if (page === "assignment") {
      return (
        <AuthorizedPage>
          <AssignmentPage
            assignmentId={this.props.assignmentId}
            goToClassToTab={this.openClassTab}
            goToClass={this.openClass}
            backButtonText="📝 See all assignments of this class"
            userClasses={userClassesIds}
          />
        </AuthorizedPage>
      );
    }

    if (page === "studyBuilder") {
      return (
        <EmptyPage>
          <StudyBuilderWrapper
            onLeave={() => this.openClassTab(this.state.classId, "studies")}
            studyId={this.state.studyId}
            user={this.props.user}
            needToClone={false}
            adminMode
          />
        </EmptyPage>
      );
    }
  }
}

export default DashboardClasses;
