import React, { Component } from 'react';
import { StyledPost, StyledJodit } from './styles';
import { Jodit } from './index';

class Post extends Component {
  render() {
    const {
      onSubmit,
      loading,
      title,
      onTitleChange,
      content,
      onContentChange,
      btnName,
    } = this.props;

    return (
      <StyledPost onSubmit={onSubmit}>
        <fieldset disabled={loading} aria-busy={loading}>
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
          <StyledJodit>
            <Jodit externalContent={content} updateContent={onContentChange} />
          </StyledJodit>
          <button type="submit">{btnName}</button>
        </fieldset>
      </StyledPost>
    );
  }
}

export default Post;
