import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import { Center, TemplatesList, StyledLink } from './styles';
import TemplateCard from './card';

// write a query here, later refactor it in a separate file if it is used elsewhere
const MY_TEMPLATES_QUERY = gql`
  query MY_TEMPLATES_QUERY {
    myTemplates {
      id
      title
      shortDescription
      description
    }
  }
`;

// using render props inside with query
// https://www.prisma.io/blog/tutorial-render-props-in-react-apollo-2-1-199e9e2bd01e
class MyTemplates extends Component {
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
        <Query query={MY_TEMPLATES_QUERY}>
          {({ data, error, loading }) => {
            console.log('data', data);
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <TemplatesList>
                {data.myTemplates.map(template => (
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

export default MyTemplates;
export { MY_TEMPLATES_QUERY };