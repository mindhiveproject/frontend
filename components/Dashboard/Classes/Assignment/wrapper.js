import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import Error from "../../../ErrorMessage/index";

import Assignment from "./assignment";
import SelectAssignment from "./selectAssignment";
import AddAssignment from "./addAssignment";
import AssignmentTab from "./assignmentTab";
import EditAssignment from "./editAssignment";

import { CLASS_ASSIGNMENTS } from "../../../Queries/Assignment";

class ClassAssignments extends Component {
  state = {
    page: this.props.page || "assignments",
    assignmentId: null,
    template: null,
    featuredAssignmentId: this.props.featuredAssignmentId || null,
  };

  // selecting an assignment template from the list or creating a new one
  selectAssignment = () => {
    this.setState({
      page: "selectassignment",
    });
  };

  // adding a new assignment (based on the template or a new one)
  addAssignment = (assignment) => {
    this.setState({
      page: "addassignment",
      template: assignment,
    });
  };

  editAssignment = (assignmentId) => {
    this.setState({
      page: "editassignment",
      assignmentId,
    });
  };

  openAssignment = (assignmentId) => {
    this.setState({
      page: "assignment",
      assignmentId,
    });
  };

  goBack = () => {
    this.setState({
      page: "assignments",
      assignmentId: null,
      template: null,
    });
  };

  render() {
    const { schoolclass, isAdmin, isEducationalResearcher } = this.props;
    const { page, assignmentId, featuredAssignmentId } = this.state;

    if (page === "selectassignment") {
      return (
        <SelectAssignment
          goBack={this.goBack}
          classId={schoolclass?.id}
          addAssignment={this.addAssignment}
          editAssignment={this.editAssignment}
          user={this.props.user}
        />
      );
    }

    if (page === "addassignment") {
      return (
        <AddAssignment
          goBack={this.goBack}
          classId={schoolclass?.id}
          template={this.state.template}
          user={this.props.user}
        />
      );
    }

    if (page === "assignment") {
      return (
        <Assignment
          goBack={this.goBack}
          classId={schoolclass?.id}
          assignmentId={assignmentId}
          isAdmin={isAdmin}
          isEducationalResearcher={isEducationalResearcher}
        />
      );
    }

    if (page === "editassignment") {
      return (
        <EditAssignment
          goBack={this.goBack}
          classId={schoolclass?.id}
          assignmentId={assignmentId}
          user={this.props.user}
        />
      );
    }

    if (page === "assignments") {
      return (
        <>
          {!this.props.featuredAssignmentId && !isEducationalResearcher && (
            <div className="navigationHeader">
              <div></div>
              <button onClick={this.selectAssignment}>Add assignment</button>
            </div>
          )}
          <Query query={CLASS_ASSIGNMENTS} variables={{ id: schoolclass?.id }}>
            {({ error, loading, data }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading</p>;
              if (!data.assignments || data.assignments.length === 0)
                return (
                  <p>
                    No assignments found for{" "}
                    <strong>{schoolclass?.title}</strong>.
                  </p>
                );
              const { assignments } = data;
              return (
                <>
                  {assignments
                    .filter((assignment) =>
                      featuredAssignmentId
                        ? assignment.id === featuredAssignmentId
                        : true
                    )
                    .map((assignment) => (
                      <AssignmentTab
                        key={assignment.id}
                        assignment={assignment}
                        classId={schoolclass.id}
                        editAssignment={this.editAssignment}
                        openAssignment={this.openAssignment}
                        featuredAssignmentId={this.props.featuredAssignmentId}
                        user={this.props.user}
                        isAdmin={isAdmin}
                        isEducationalResearcher={isEducationalResearcher}
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
