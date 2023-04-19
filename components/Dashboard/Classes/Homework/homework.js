import React, { Component } from "react";
import Post from "./post";

import { StyledEditor, StyledSelectionScreen, StyledPost } from "./styles";

class Homework extends Component {
  render() {
    const {
      homework,
      content,
      settings,
      onContentChange,
      onSettingsChange,
    } = this.props;
    return (
      <StyledEditor>
        <StyledPost>
          <Post
            content={content}
            settings={settings}
            author={homework?.author?.username}
            updatedAt={homework?.updatedAt}
            onContentChange={onContentChange}
            onSettingsChange={onSettingsChange}
            isAdmin={this.props.isAdmin}
            isEducationalResearcher={this.props.isEducationalResearcher}
          />
        </StyledPost>
      </StyledEditor>
    );
  }
}

export default Homework;
