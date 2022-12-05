import React, { Component } from 'react';
import { StyledPost, StyledJodit } from './styles';
import { Jodit } from './index';

class Note extends Component {
  render() {
    const {
      onSubmit,
      loading,
      title,
      onTitleChange,
      content,
      onContentChange,
      btnName,
      hideTitle,
      hideSubmitBtn,
    } = this.props;

    return (
      <StyledPost onSubmit={onSubmit}>
        <fieldset disabled={loading} aria-busy={loading}>
          {!hideTitle && (
            <label htmlFor="title">
              <p>Title</p>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={onTitleChange}
                required
              />
            </label>
          )}

          <StyledJodit>
            <Jodit externalContent={content} updateContent={onContentChange} />
          </StyledJodit>
          {!hideSubmitBtn && <button type="submit">{btnName}</button>}
        </fieldset>
      </StyledPost>
    );
  }
}

export default Note;
