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
    const copyLink = `https://mindhive.science/studies/${this.props.study.slug}`;
    const temp = document.createElement('input');
    document.body.append(temp);
    temp.value = copyLink;
    temp.select();
    document.execCommand('copy');
    temp.remove();
  };

  render() {
    const { study } = this.props;

    return (
      <StyledSharingPane>
        <FindCollaborator
          study={study}
          handleCollaboratorsChange={this.props.handleCollaboratorsChange}
          handleSetState={this.props.handleSetState}
        />

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

        {study.slug && (
          <div>
            <p>Private access link</p>
            <span>
              Anyone with the link will be able to preview the study. Click
              below to copy link.
            </span>
            <label htmlFor="slug" onClick={() => this.copyLink()}>
              <p className="accessLink">
                https://mindhive.science/studies/
                {study.slug}
              </p>
            </label>
          </div>
        )}
      </StyledSharingPane>
    );
  }
}

export default EditSharing;
