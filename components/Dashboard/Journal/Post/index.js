import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';

import ReactHtmlParser from 'react-html-parser';
import DeletePost from './deletePost';

const StyledPost = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: auto 1fr;
  background: white;
  border-radius: 1rem;
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
    .date {
      font-size: 14px;
      color: grey;
    }
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
            <div>
              <div className="date">
                {moment(post.createdAt).format('MMMM Do YYYY, h:mm a')}
              </div>
              {post?.updatedAt !== post?.createdAt && (
                <div className="date">
                  Edited on:{' '}
                  {moment(post?.updatedAt).format('MMMM Do YYYY, h:mm a')}
                </div>
              )}
            </div>
            <span onClick={() => this.props.editPost(post.id)}>
              <Icon name="edit" />
            </span>

            {!this.props.teacherMode && (
              <DeletePost postId={post.id} journalId={journalId} />
            )}
          </div>
        </div>

        <div className="content">{ReactHtmlParser(post.content)}</div>
      </StyledPost>
    );
  }
}

export default Post;
