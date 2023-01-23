import React, { Component } from "react";
import styled from "styled-components";
import InDev from "../inDev";

import NotebookWrapper from "../../../Starboard/wrapper";

const StyledNotebookBoard = styled.div`
  display: grid;
  width: 100%;
  overflow-y: scroll;
`;

class AnalyzeSection extends Component {
  render() {
    const { study, user } = this.props;
    if (!study || !study.id) {
      return (
        <InDev
          header="No study found"
          message="Please save your study first."
        />
      );
    }

    return (
      <StyledNotebookBoard>
        <NotebookWrapper study={study} user={user} />;
      </StyledNotebookBoard>
    );
  }
}

export default AnalyzeSection;
