import React, { Component } from "react";
import styled from "styled-components";
import InDev from "../inDev";

import CollectWrapper from "./wrapper";

export const StyledCollectPage = styled.div`
  display: grid;
  width: 100%;
  overflow-y: scroll;
`;

class CollectSection extends Component {
  render() {
    const { study } = this.props;

    if (!study?.id) {
      return (
        <InDev
          header="👀 No study found"
          message="Please save your new study"
        />
      );
    }

    return (
      <StyledCollectPage>
        <CollectWrapper study={study} />
      </StyledCollectPage>
    );
  }
}

export default CollectSection;
