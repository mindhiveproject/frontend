import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import ComponentBuilder from './builder';

import {
  StyledStudyBuilder,
  StudyBuilderNav,
  StyledEditPane,
  StyledPreviewPane,
  StyledStudyBuilderPage,
} from './styles';

const COMPONENT_TO_CLONE_QUERY = gql`
  query COMPONENT_TO_CLONE_QUERY($id: ID!) {
    task(where: { id: $id }) {
      id
      title
      slug
      description
      parameters
      settings
      updatedAt
      link
      author {
        id
      }
      template {
        id
        title
        description
        parameters
        script
        style
      }
      collaborators {
        id
        username
      }
      consent {
        id
        title
      }
      taskType
    }
  }
`;

class ComponentBuilderWrapper extends Component {
  render() {
    return (
      <Query
        query={COMPONENT_TO_CLONE_QUERY}
        variables={{ id: this.props.componentId }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading ... </p>;
          if (!data || !data.task)
            return <p>No task found for id {this.props.id}</p>;
          return (
            <ComponentBuilder
              onLeave={this.props.onLeave}
              task={data.task}
              user={this.props.user}
            />
          );
        }}
      </Query>
    );
  }
}

export default ComponentBuilderWrapper;
