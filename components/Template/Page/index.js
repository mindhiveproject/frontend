import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Head from 'next/head';
import Error from '../../ErrorMessage/index';
import TemplatePage from './page';

import { StyledTemplate } from '../styles';

const REVIEW_TEMPLATE_QUERY = gql`
  query REVIEW_TEMPLATE_QUERY($id: ID!) {
    template(where: { id: $id }) {
      id
      title
      description
      largeImage
      parameters
      script
      style
      tasks {
        id
        title
        author {
          id
          username
        }
        createdAt
        updatedAt
        settings
      }
    }
  }
`;

class ReviewTemplate extends Component {
  render() {
    return (
      <Query query={REVIEW_TEMPLATE_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.template)
            return <p>No template found for {this.props.id}</p>;
          const { template } = data;
          return <TemplatePage template={template} />;
        }}
      </Query>
    );
  }
}

export default ReviewTemplate;
export { REVIEW_TEMPLATE_QUERY };
