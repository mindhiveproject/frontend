import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import { Center, TemplatesList, StyledLink } from './styles';
import TemplateCard from './card';

// write a query here, later refactor it in a separate file if it is used elsewhere
const ALL_TEMPLATES_QUERY = gql`
  query ALL_TEMPLATES_QUERY {
    templates {
      id
      title
      shortDescription
      description
    }
  }
`;

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-react-apollo-2-1-199e9e2bd01e
class AllTemplates extends Component {
  render() {
    return (
      <Center>
        <h1>Task templates</h1>
        <Link
          href={{
            pathname: '/templates/add',
          }}
        >
          <a>
            <button>
              <h2>Add new task template</h2>
            </button>
          </a>
        </Link>
        <Query query={ALL_TEMPLATES_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <TemplatesList>
                {data.templates.map(template => (
                  <TemplateCard template={template} key={template.id} />
                ))}
              </TemplatesList>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default AllTemplates;
export { ALL_TEMPLATES_QUERY };
