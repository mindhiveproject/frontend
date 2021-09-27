import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';
import moment from 'moment';

import ReactHtmlParser from 'react-html-parser';

const GET_HOMEWORK = gql`
  query GET_HOMEWORK($id: ID!) {
    homework(where: { id: $id }) {
      id
      title
      content
      settings
      public
      author {
        username
      }
      createdAt
    }
  }
`;

const StyledEditor = styled.div`
  .header {
    display: grid;
    justify-content: end;
  }
  .closeBtn {
    line-height: 3rem;
    text-align: center;
    cursor: pointer;
    border-radius: 2.25rem;
    color: #5f6871;
    font-size: 2rem;
    cursor: pointer;
    :hover {
      transform: scale(1.5);
      transition: transform 0.5s;
      color: red;
    }
  }
`;

const StyledSelectionScreen = styled.div`
  display: grid;
  background: #f7f9f8;
`;

const StyledPost = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background: white;
  border-radius: 1rem;
  .header {
    padding: 15px 20px 20px 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr auto auto;
    align-content: center;
    background: #007c70;
    color: white;
  }
  .content {
    padding: 15px 20px 20px 20px;
  }
`;

class Homework extends Component {
  state = {
    id: this.props.homeworkId,
  };

  render() {
    return (
      <StyledEditor>
        <div className="header">
          <div className="closeBtn">
            <div onClick={this.props.goBack}>&times;</div>
          </div>
        </div>
        <Query query={GET_HOMEWORK} variables={{ id: this.props.homeworkId }}>
          {({ data, loading }) => {
            if (loading) return <p>Loading ... </p>;
            if (!data || !data.homework)
              return <p>No homework found for id {this.props.homeworkId}</p>;
            const { homework } = data;
            return (
              <StyledPost>
                <div className="header">
                  <div>{homework.title}</div>
                  <div>{homework?.author?.username}</div>
                  <div>{moment(homework?.createdAt).format('MMM D, YYYY')}</div>
                </div>
                <div className="content">
                  {ReactHtmlParser(homework.content)}
                </div>
              </StyledPost>
            );
          }}
        </Query>
      </StyledEditor>
    );
  }
}

export default Homework;
