import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import ReactHtmlParser from 'react-html-parser';
import ExperimentPreview from '../../../../Task/Preview/index';
import Card from './card';
// import Card from '../../Component/Card/index';

const StyledTaskCard = styled.div`
  display: grid;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09), 0px 5px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  border-top: 14px solid;
  border-top-color: ${props =>
    props.taskType === 'TASK'
      ? '#64c9e2'
      : props.taskType === 'SURVEY'
      ? '#28619e'
      : '#ffc7c3'};
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

const EmptyContainer = styled.div`
  display: grid;
  width: 100%;
  border: 1px solid grey;
  min-height: 100px;
  border-radius: 4px;
`;

// write a query here, later refactor it in a separate file if it is used elsewhere
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
      isExternal
    }
  }
`;

class ComponentPane extends Component {
  render() {
    const { component, viewing } = this.props;

    return (
      <Query
        query={COMPONENT_QUERY}
        variables={{ id: this.props.component.id }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.task)
            return (
              <EmptyContainer>
                {false && (
                  <>
                    <p>
                      <em>{this.props.component.title}</em> was not found. It
                      might be deleted.
                    </p>
                    <button
                      onClick={() =>
                        this.removeFromStudy(
                          this.props.component,
                          this.props.number
                        )
                      }
                    >
                      Remove <em>{this.props.component.title}</em> from study
                    </button>
                  </>
                )}
                {this.props.onRemoveComponent && (
                  <div>
                    <button
                      onClick={() =>
                        this.props.onRemoveComponent(
                          this.props.component,
                          this.props.blockNumber,
                          this.props.betweenNumber,
                          this.props.withinNumber
                        )
                      }
                    >
                      &times;
                    </button>
                  </div>
                )}
              </EmptyContainer>
            );
          const component = data.task;
          return (
            <StyledTaskCard>
              <Card
                key={component.id}
                component={component}
                openTaskEditor={this.props.openTaskEditor}
                onRemoveWholeComponent={this.props.onRemoveWholeComponent}
                onRemoveComponent={this.props.onRemoveComponent}
                viewing={viewing}
                blockNumber={this.props.blockNumber}
                betweenNumber={this.props.betweenNumber}
                withinNumber={this.props.withinNumber}
                inStudyBuilder
              />
            </StyledTaskCard>
          );
        }}
      </Query>
    );
  }
}

export default ComponentPane;
export { COMPONENT_QUERY };
