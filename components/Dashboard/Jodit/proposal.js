import React, { Component } from 'react';
import { Jodit } from './index';

class JoditProposal extends Component {
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
      <Jodit
        readonly
        externalContent={content}
        updateContent={onContentChange}
      />
    );
  }
}

export default JoditProposal;
