import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import styled from 'styled-components';
import CardWrapper from './cardWrapper';

const StyledBank = styled.div`
  display: grid;
`;

const MY_SURVEYS_QUERY = gql`
  query MY_SURVEYS_QUERY {
    myTasks(where: { taskType: SURVEY }) {
      id
      title
      slug
      author {
        id
      }
      collaborators {
        id
        username
      }
      public
      taskType
      parameters
      template {
        id
        title
        description
        parameters
        script
        style
      }
      link
    }
  }
`;

class Surveys extends Component {
  render() {
    return (
      <>
        <Query query={MY_SURVEYS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const surveys = data.myTasks;
            return (
              <StyledBank>
                <div className="surveys">
                  {surveys.map(survey => (
                    <CardWrapper
                      key={survey.id}
                      component={survey}
                      redirect="d"
                      onAddComponent={this.props.onAddComponent}
                      openTaskEditor={this.props.openTaskEditor}
                    />
                  ))}
                </div>
              </StyledBank>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Surveys;
export { MY_SURVEYS_QUERY };
