import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import ReactHtmlParser from 'react-html-parser';
import DeletePost from './deletePost';

const StyledPost = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background: white;
  border-radius: 1rem;
  max-width: 450px;
  .header {
    padding: 15px 20px 20px 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr;
    align-items: center;
  }
  .headerInfo {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr auto auto;
  }
  .content {
    padding: 15px 20px 20px 20px;
  }
`;

class Post extends Component {
  render() {
    const { post, journalId } = this.props;
    return (
      <StyledPost>
        <div className="header">
          <div>
            <h2>{post.title}</h2>
          </div>
          <div className="headerInfo">
            <span>{moment(post.createdAt).format('MMMM D, YYYY')}</span>
            <span onClick={() => this.props.editPost(post.id)}>Edit</span>
            <DeletePost postId={post.id} journalId={journalId}>
              Delete
            </DeletePost>
          </div>
        </div>

        <div className="content">{ReactHtmlParser(post.content)}</div>
      </StyledPost>
    );
  }
}

export default Post;
