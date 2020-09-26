import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { StyledBank, StyledSurveyCard } from '../styles';

import SurveyCard from './surveycard';

const ALL_PUBLIC_SURVEYS_QUERY = gql`
  query ALL_PUBLIC_SURVEYS_QUERY {
    tasks(where: { taskType: SURVEY }) {
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
      description
      taskType
    }
  }
`;

class SurveysBank extends Component {
  render() {
    return (
      <>
        <Query query={ALL_PUBLIC_SURVEYS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { tasks } = data;
            return (
              <StyledBank>
                <div className="surveys">
                  {tasks.map(survey => (
                    <SurveyCard key={survey.id} survey={survey} />
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

export default SurveysBank;
