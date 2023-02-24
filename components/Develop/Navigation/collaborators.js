import React, { Component } from "react";
import { Dropdown, Icon } from "semantic-ui-react";
import Avatar from "react-avatar";

import styled from "styled-components";

const StyledCollaborators = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 5px;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  .icons {
    display: grid;
    grid-gap: 1px;
    grid-auto-flow: column;
  }
`;

class Collaborators extends Component {
  render() {
    const { study, openSharingModal } = this.props;
    const collaborators = study?.collaborators || [];

    return (
      <StyledCollaborators
        onClick={() => {
          openSharingModal();
        }}
      >
        <div className="icons">
          {collaborators.map((collaborator, num) => (
            <div>
              <Avatar name={collaborator} maxInitials={2} size="26px" round />
            </div>
          ))}
        </div>

        <Icon size="large" name="dropdown" />
      </StyledCollaborators>
    );
  }
}

export default Collaborators;
