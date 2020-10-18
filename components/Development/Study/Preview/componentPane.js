import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ReactHtmlParser from 'react-html-parser';
import ExperimentPreview from '../../../Task/Preview/index';
import Card from '../../Component/Card/index';

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
    }
  }
`;

class ComponentPane extends Component {
  removeFromStudy = (component, number) => {
    this.props.onRemoveComponent(component, number);
  };

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
            return <p>No task found for id {this.props.id}</p>;
          const component = data.task;
          return (
            <>
              <Card
                key={component.id}
                component={component}
                openTaskEditor={this.props.openTaskEditor}
                onRemoveComponent={this.removeFromStudy}
                viewing={viewing}
                number={this.props.number}
              />
            </>
          );
        }}
      </Query>
    );
  }
}

export default ComponentPane;
export { COMPONENT_QUERY };
