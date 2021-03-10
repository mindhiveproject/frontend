import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import moment from 'moment';

import Error from '../../ErrorMessage/index';
import { StyledDasboard, StyledDevelopDasboard } from '../styles';

import Post from './Post/index';
import AddPost from './Post/addpost';
import EditPost from './Post/editpost';

import { ContainerOnlyForAdmin } from '../../Permissions/Admin/index';
import AddSketch from './Post/addsketch';

const StyledPosts = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 10px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  cursor: pointer;
  font-weight: bold;
`;

const JOURNAL_POSTS = gql`
  query JOURNAL_POSTS($id: ID!) {
    posts(where: { journal: { id: $id } }) {
      id
      title
      content
      createdAt
    }
  }
`;

class JournalPage extends Component {
  state = {
    page: this.props.page || 'posts',
    postId: null,
  };

  addPost = () => {
    this.setState({
      page: 'addpost',
    });
  };

  addSketch = () => {
    this.setState({
      page: 'addsketch',
    });
  };

  editPost = postId => {
    console.log('postId', postId);
    this.setState({
      page: 'editpost',
      postId,
    });
  };

  goBack = () => {
    this.setState({
      page: 'posts',
      postId: null,
    });
  };

  render() {
    const { journal } = this.props;
    const { page, postId } = this.state;

    if (page === 'addpost') {
      return <AddPost goBack={this.goBack} journalId={journal.id} />;
    }

    if (page === 'addsketch') {
      return <AddSketch goBack={this.goBack} journalId={journal.id} />;
    }

    if (page === 'editpost') {
      return (
        <EditPost goBack={this.goBack} journalId={journal.id} postId={postId} />
      );
    }

    if (page === 'posts') {
      return (
        <StyledDasboard>
          <StyledDevelopDasboard>
            <Head>
              <title>mindHIVE | {journal.title}</title>
            </Head>
            <>
              <div className="goBackBtn">
                <span style={{ cursor: 'pointer' }} onClick={this.props.goBack}>
                  ← Back
                </span>
              </div>
            </>

            <div className="navigationHeader">
              <div>
                <h1>{journal.title}</h1>
                <p>{journal.description}</p>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridGap: '10px',
                }}
              >
                <button onClick={this.addPost}>Add note</button>
                <ContainerOnlyForAdmin>
                  <button onClick={this.addSketch}>Add sketch</button>
                </ContainerOnlyForAdmin>
              </div>
            </div>

            <Query query={JOURNAL_POSTS} variables={{ id: journal.id }}>
              {({ error, loading, data }) => {
                if (error) return <Error error={error} />;
                if (loading) return <p>Loading</p>;
                if (!data.posts)
                  return <p>No journal found for {journal.title}</p>;
                const { posts } = data;
                return (
                  <StyledPosts>
                    {posts.map(post => (
                      <Post
                        key={post.id}
                        post={post}
                        journalId={journal.id}
                        editPost={this.editPost}
                        teacherMode={this.props.teacherMode}
                      />
                    ))}
                  </StyledPosts>
                );
              }}
            </Query>
          </StyledDevelopDasboard>
        </StyledDasboard>
      );
    }
  }
}

export default JournalPage;
export { JOURNAL_POSTS };
