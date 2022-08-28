import React, { Component } from 'react';
import styled from 'styled-components';
import FindCollaborator from '../../../../Development/Study/StudyBuilder/Edit/findCollaborator';

const StyledCollabolators = styled.div`
  display: grid;
  margin-bottom: 30px;
`;

class EditSharing extends Component {
  render() {
    const { task } = this.props;

    return (
      <StyledCollabolators>
        <div className="block">
          <h2>Collaborators</h2>
          <p>Edit the list of collaborators here</p>
          <FindCollaborator
            study={task}
            handleCollaboratorsChange={this.props.handleCollaboratorsChange}
            handleSetState={this.props.handleSetState}
          />
        </div>
      </StyledCollabolators>
    );
  }
}

export default EditSharing;
