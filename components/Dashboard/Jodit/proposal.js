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
    } = this.props;

    return (
      <StyledPost>
        <fieldset>
          <StyledJodit>
            <Jodit
              readonly
              externalContent={content}
              updateContent={onContentChange}
            />
          </StyledJodit>
        </fieldset>
      </StyledPost>
    );
  }
}

export default Note;

// <h2>{title}</h2>
