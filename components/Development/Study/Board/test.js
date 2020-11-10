import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Card from './card';

const StyledTaskCard = styled.div`
  display: grid;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09), 0px 5px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  border-top: 14px solid;
  border-top-color: ${props =>
    props.taskType === 'TASK' ? '#64c9e2' : '#28619e'};
  padding: 16px;
  width: 100%;
  .cardHeader {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-items: end;
    button {
      text-align: center;
      border-radius: 20px;
    }
  }
  .cardInfo {
    display: grid;
    grid-gap: 10px;
    text-align: left;
  }
  .cardButtons {
    display: grid;
    align-items: center;
    justify-items: start;
    grid-template-columns: repeat(auto-fit, minmax(100px, auto));
    grid-gap: 10px;
    button {
      padding: 10px 25px 10px 25px;
      color: #007c70;
      background: white;
      border: 2px #007c70 solid;
      font-family: Lato;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0.05em;
      text-align: center;
      cursor: pointer;
    }
    a {
      cursor: pointer;
      text-decoration-line: underline;
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0.04em;
      text-align: center;
    }
  }
`;

const StyledTest = styled.div`
  /* border: 1px brown solid;
  background: #ffffea;
  position: relative; */
`;

const COMPONENT_QUERY = gql`
  query COMPONENT_QUERY($id: ID!) {
    task(where: { id: $id }) {
      id
      title
      slug
      description
      parameters
      settings
      updatedAt
      link
      template {
        id
        title
        description
        parameters
        script
        style
      }
      taskType
    }
  }
`;

class Test extends Component {
  render() {
    const { test } = this.props;
    return (
      <StyledTest>
        <Query query={COMPONENT_QUERY} variables={{ id: test.id }}>
          {({ data, loading }) => {
            if (loading) return <p>Loading ... </p>;
            const component = data.task;
            return (
              <StyledTaskCard taskType={component.taskType}>
                <Card
                  key={test.testId}
                  testId={test.testId}
                  component={component}
                  openTaskEditor={this.props.openTaskEditor}
                  viewing={this.props.viewing}
                  onDeleteTest={this.props.onDeleteTest}
                  inStudyBuilder
                />
              </StyledTaskCard>
            );
          }}
        </Query>
      </StyledTest>
    );
  }
}

export default Test;
