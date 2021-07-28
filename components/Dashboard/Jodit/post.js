import React, { Component } from 'react';
import { StyledPost, StyledJodit } from './styles';
import { Jodit } from './index';
import AssignmentForm from './Forms/assignmentForm';
import StatusForm from './Forms/statusForm';

class Post extends Component {
  render() {
    const {
      loading,
      title,
      onChange,
      description,
      content,
      comment,
      onContentChange,
      assignedTo,
      onAssignedToChange,
      settings,
      onSettingsChange,
      card,
      proposal,
      readonly,
      proposalBuildMode,
    } = this.props;

    // collaborators
    const { study } = proposal;
    // extract author and collaborators of the study
    const authorUsername = {
      key: study?.author?.username,
      text: study?.author?.username,
      value: study?.author?.username,
    };
    const usernames =
      study?.collaborators.map(user => ({
        key: user.username,
        text: user.username,
        value: user.username,
      })) || [];
    const allUsernames = [authorUsername, ...usernames];

    // card settings
    const status = card?.settings?.status;

    return (
      <StyledPost>
        <div className="proposalCardBoard">
          <div className="textBoard">
            <fieldset disabled={loading} aria-busy={loading}>
              {proposalBuildMode && (
                <label htmlFor="title">
                  <p>Title</p>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={onChange}
                  />
                </label>
              )}
              {proposalBuildMode && (
                <label htmlFor="description">
                  <p>Description</p>
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={onChange}
                  />
                </label>
              )}
              {!proposalBuildMode && <div className="cardHeader">{title}</div>}
              {!proposalBuildMode && (
                <div className="cardDescription">{description}</div>
              )}
              <StyledJodit>
                <Jodit
                  externalContent={content}
                  updateContent={onContentChange}
                  readonly={readonly}
                />
              </StyledJodit>
            </fieldset>
          </div>

          <div className="infoBoard">
            {!proposalBuildMode && !readonly && (
              <>
                <div>
                  <h4>Assigned to</h4>
                  <AssignmentForm
                    usernames={allUsernames}
                    assignedTo={assignedTo}
                    onAssignedToChange={onAssignedToChange}
                  />
                </div>
                <div>
                  <h4>Status</h4>
                  <StatusForm
                    settings={settings}
                    onSettingsChange={onSettingsChange}
                  />
                </div>
              </>
            )}
            {!proposalBuildMode && readonly && (
              <>
                <div>
                  <h4>Assigned to</h4>
                  <div>
                    {card?.assignedTo.map(
                      c => c.publicReadableId || 'John Doe'
                    )}
                  </div>
                </div>
                <div>
                  <h4>Status</h4>
                  <div>{settings?.status}</div>
                </div>
              </>
            )}

            <div className="proposalCardComments">
              <h4>Comments</h4>
              <textarea
                rows="13"
                type="text"
                id="comment"
                name="comment"
                value={comment}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </StyledPost>
    );
  }
}

export default Post;
