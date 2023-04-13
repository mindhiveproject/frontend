import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import ParticipantTable from "./table";
import { StyledParticipantsBoard } from "./styles";

class ParticipantsOverview extends Component {
  state = {
    sortBy: "username",
    isDirectSorting: true,
  };

  sortBy = (sortBy) => {
    this.setState({
      sortBy,
      isDirectSorting: !this.state.isDirectSorting,
    });
  };

  render() {
    const { participants } = this.props;
    const { sortBy, isDirectSorting } = this.state;

    return (
      <StyledParticipantsBoard>
        <div className="tableHeader">
          {/* <p onClick={() => this.sortBy("publicReadableId")}>
              Readable ID{" "}
              {this.state.sortBy === "publicReadableId" &&
              !this.state.isDirectSorting ? (
                <Icon name="arrow up" />
              ) : (
                <Icon name="arrow down" />
              )}
            </p> */}
          <p>Public ID</p>
          <p>Duration</p>
          <p>Number of completed tasks</p>
          <p>Condition name</p>
          {/* <p onClick={() => this.sortBy("condition")}>
              Condition{" "}
              {this.state.sortBy === "condition" &&
              !this.state.isDirectSorting ? (
                <Icon name="arrow up" />
              ) : (
                <Icon name="arrow down" />
              )}
            </p> */}

          <p>Consent decision</p>
          <p>Timestamp of consent decision</p>
          <p>Account</p>
          <p>Include in analysis</p>
        </div>
        <ParticipantTable
          studyId={this.props.studyId}
          participants={participants}
          sortBy={this.state.sortBy}
          isDirectSorting={this.state.isDirectSorting}
          openParticipant={this.props.openParticipant}
          openGuestParticipant={this.props.openGuestParticipant}
          consents={this.props.consents}
        />
      </StyledParticipantsBoard>
    );
  }
}

export default ParticipantsOverview;
