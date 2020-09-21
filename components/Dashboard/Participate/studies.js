import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import sortBy from 'lodash/sortBy';
import { StyledParticipantDasboard } from '../styles';
import StudyCard from './studycard';

// write a query here, later refactor it in a separate file if it is used elsewhere
const ALL_STUDIES_TO_PARTICIPATE_QUERY = gql`
  query ALL_STUDIES_TO_PARTICIPATE_QUERY {
    studies {
      id
      title
      slug
      image
      author {
        id
      }
      collaborators {
        id
      }
      public
    }
  }
`;

class StudiesDashboard extends Component {
  render() {
    const { participantStudies, username } = this.props;
    return (
      <Query query={ALL_STUDIES_TO_PARTICIPATE_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.studies) return <p>No studies found</p>;
          const { studies } = data;

          return (
            <StyledParticipantDasboard>
              <h1>Discover</h1>
              <p>
                Explore all public studies, tasks and surveys. Participate in
                studies or browse and preview tasks and surveys.
              </p>

              <div className="studiesBoard">
                <div className="studies">
                  {studies.map(study => (
                    <StudyCard key={study.id} study={study} />
                  ))}
                </div>
              </div>
            </StyledParticipantDasboard>
          );
        }}
      </Query>
    );
  }
}

export default StudiesDashboard;
