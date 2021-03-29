import React, { Component } from 'react';
import { StyledPost, StyledJodit } from './styles';
import { Jodit } from './index';

class Post extends Component {
  render() {
    const {
      loading,
      title,
      onTitleChange,
      content,
      onContentChange,
      readonly,
      proposalBuildMode,
    } = this.props;

    return (
      <StyledPost>
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
                  onChange={onTitleChange}
                />
              </label>
            )}
            {!proposalBuildMode && <div className="cardHeader">{title}</div>}
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
          {false && (
            <>
              <div>
                <p>Assigned to</p>
              </div>
              <div>
                <p>Status</p>
              </div>
            </>
          )}
        </div>
      </StyledPost>
    );
  }
}

export default Post;
