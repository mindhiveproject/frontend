import React, { Component } from 'react';

import styled from 'styled-components';

import FindCollaborator from '../../Study/Edit/findCollaborator';

const StyledSharingPane = styled.div`
  display: grid;
  grid-gap: 30px;
  .collaboratorsList {
    margin-top: 20px;
    margin-bottom: 30px;
  }
  .accessLink {
    padding: 15px 10px 15px 10px;
    background: #fff3cd;
    border-radius: 4px;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    cursor: pointer;
    margin-top: 14px;
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
  copyLink = () => {
    const copyLink = `https://mindhive.science/tasks/${this.props.task.slug}`;
    const temp = document.createElement('input');
    document.body.append(temp);
    temp.value = copyLink;
    temp.select();
    document.execCommand('copy');
    temp.remove();
  };

  render() {
    const { task } = this.props;

    return (
      <StyledSharingPane>
        <FindCollaborator
          study={task}
          handleCollaboratorsChange={this.props.handleCollaboratorsChange}
          handleSetState={this.props.handleSetState}
        />

        <div>
          <p>Publish task on MindHive?</p>
          <p>
            A published task is accessible to everyone on the platform. It
            requires administrative approval before visible to all.
          </p>
          <ResponseButtons>
            <button
              onClick={() =>
                this.props.handleSetState('submitForPublishing', true)
              }
              className={task.submitForPublishing ? 'selectedBtn' : undefined}
            >
              Yes
            </button>
            <button
              onClick={() =>
                this.props.handleSetState('submitForPublishing', false)
              }
              className={!task.submitForPublishing ? 'selectedBtn' : undefined}
            >
              No
            </button>
          </ResponseButtons>
        </div>

        {task.slug && (
          <div>
            <p>Private access link</p>
            <p>
              Anyone with the link will be able to preview the task. Click below
              to copy link.
            </p>
            <label htmlFor="slug" onClick={() => this.copyLink()}>
              <p className="accessLink">
                https://mindhive.science/tasks/
                {task.slug}
              </p>
            </label>
          </div>
        )}
      </StyledSharingPane>
    );
  }
}

export default EditSharing;
