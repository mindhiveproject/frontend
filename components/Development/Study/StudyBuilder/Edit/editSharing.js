import React, { Component } from 'react';
import styled from 'styled-components';
import FindCollaborator from './findCollaborator';

const StyledSharingPane = styled.div`
  display: grid;
  grid-gap: 30px;
  .collaboratorsList {
    margin-top: 20px;
    margin-bottom: 30px;
  }
`;

const ResponseButtons = styled.div`
  display: grid;
  grid-template-columns: 90px 90px;
  grid-template-rows: 48px;
  margin-top: 20px;
  margin-bottom: 30px;
  .selectedBtn {
    background: #007c70;
    color: #ffffff;
  }
`;

class EditSharing extends Component {
  render() {
    const { study } = this.props;

    return (
      <StyledSharingPane>
        {false && (
          <FindCollaborator
            study={study}
            handleCollaboratorsChange={this.props.handleCollaboratorsChange}
            handleSetState={this.props.handleSetState}
          />
        )}

        <div>
          <label>Publish study on MindHive?</label>
          <span>
            A published study is accessible to everyone on the platform. It
            requires administrative approval before visible to all.
          </span>
          <ResponseButtons>
            <button
              onClick={() =>
                this.props.handleSetState('submitForPublishing', true)
              }
              className={study.submitForPublishing ? 'selectedBtn' : undefined}
            >
              Yes
            </button>
            <button
              onClick={() =>
                this.props.handleSetState('submitForPublishing', false)
              }
              className={!study.submitForPublishing ? 'selectedBtn' : undefined}
            >
              No
            </button>
          </ResponseButtons>
        </div>
      </StyledSharingPane>
    );
  }
}

export default EditSharing;
