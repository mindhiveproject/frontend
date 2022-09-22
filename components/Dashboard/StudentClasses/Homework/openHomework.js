import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

import { GET_HOMEWORK } from '../../../Queries/Homework';

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
  grid-gap: 15px;
  background: #f7f9f8;
  .content {
    background: white;
    padding: 10px;
  }
`;

class OpenHomework extends Component {
  state = {
    id: this.props.homeworkId,
  };

  handleTitleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  handleContentChange = content => {
    if (content || content === '') {
      this.setState({
        content,
      });
    }
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
              <StyledSelectionScreen>
                <h2>{homework?.title}</h2>
                <div className="content">
                  {ReactHtmlParser(homework?.content)}
                </div>
                {homework?.settings?.status && (
                  <div>
                    <h3>Status</h3>
                    <p>{homework?.settings?.status}</p>
                  </div>
                )}
                {homework?.settings?.comment && (
                  <div>
                    <h3>Comment</h3>
                    <p>{homework?.settings?.comment}</p>
                  </div>
                )}
              </StyledSelectionScreen>
            );
          }}
        </Query>
      </StyledEditor>
    );
  }
}

export default OpenHomework;
