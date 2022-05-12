import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { StyledBank, StyledStudyCard, StyledZeroState } from '../styles';
import StudyCard from './studycard';

const ALL_PARTICIPATED_STUDIES_QUERY = gql`
  query ALL_PARTICIPATED_STUDIES_QUERY {
    myParticipatedStudies {
      id
      title
      slug
      author {
        id
        permissions
      }
      collaborators {
        id
        permissions
      }
      participants {
        id
      }
      public
      image
      description
      tasks {
        id
      }
      components
    }
  }
`;

class ParticipatedStudiesBank extends Component {
  render() {
    return (
      <>
        <Query query={ALL_PARTICIPATED_STUDIES_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const studies = data.myParticipatedStudies;
            if (studies.length === 0) {
              return (
                <StyledZeroState>
                  <div className="message">
                    <h2>You haven't participated in any studies yet.</h2>
                    <p>Switch to the 'All studies' tab to Discover new studies.</p>
                  </div>
                </StyledZeroState>
              );
            }
            let filteredStudies = studies
            let studiesIDsToHide = studies
              .map(study => study.id);

            if (this.props.allStudies) {
              filteredStudies = this.props.allStudies.filter(
                study => !studiesIDsToHide.includes(study?.id)
              );
            }
            return (
              <StyledBank>
                <div className="studies">
                  {filteredStudies.map(study => (
                    <StudyCard
                      key={study.id}
                      study={study}
                      onSelectStudy={this.props.onSelectStudy}
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

export default ParticipatedStudiesBank;
