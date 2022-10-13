import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from '@apollo/client/react/components';

import { CREATE_NEW_POST } from '../../../Mutations/Journal';
import { MY_JOURNALS_QUERY, JOURNAL_POSTS } from '../../../Queries/Journal';

import { StyledPost } from '../../Jodit/styles';

import Sketch from './sketch';

const StyledSelectionScreen = styled.div`
  display: grid;
  /* height: 100vh; */
  margin: 30px;
  background: #f7f9f8;
  grid-template-rows: 0px auto;
  .header {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .closeBtn {
    width: 3.3rem;
    line-height: 3rem;
    text-align: center;
    cursor: pointer;
    border-radius: 2.25rem;
    color: #5f6871;
    padding-bottom: 5px;
    font-size: 2rem;
    :hover {
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
`;

class AddPost extends Component {
  state = {
    title: '',
    content: '',
    journal: this.props.journalId,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  updateContent = content => {
    if (content) {
      this.setState({
        content,
      });
    }
  };

  render() {
    return (
      <StyledSelectionScreen>
        <Mutation
          mutation={CREATE_NEW_POST}
          variables={this.state}
          refetchQueries={[
            { query: JOURNAL_POSTS, variables: { id: this.props.journalId } },
            { query: MY_JOURNALS_QUERY },
          ]}
        >
          {(createPost, { loading, error }) => (
            <>
              <div className="header">
                <div></div>
                <div className="closeBtn">
                  <span onClick={this.props.goBack}>&times;</span>
                </div>
              </div>

              <StyledPost
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await createPost();
                  this.props.goBack();
                }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  <label htmlFor="title">
                    <p>Title</p>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleChange}
                      required
                    />
                  </label>
                  <Sketch />
                  <button type="submit">Create</button>
                </fieldset>
              </StyledPost>
            </>
          )}
        </Mutation>
      </StyledSelectionScreen>
    );
  }
}

export default AddPost;
