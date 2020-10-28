import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Link from 'next/link';
import { StyledBank, StyledStudyCard } from '../styles';
import StudyCard from './studycard';

// import sortBy from 'lodash/sortBy';

const ALL_PARTICIPATED_STUDIES_QUERY = gql`
  query ALL_PARTICIPATED_STUDIES_QUERY {
    myParticipatedStudies {
      id
      title
      slug
      author {
        id
      }
      collaborators {
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

// const ALL_PARTICIPATED_STUDIES_QUERY = gql`
//   query ALL_PARTICIPATED_STUDIES_QUERY {
//     studies {
//       id
//       title
//       slug
//       author {
//         id
//       }
//       collaborators {
//         id
//       }
//       public
//       image
//       description
//       tasks {
//         id
//       }
//     }
//   }
// `;

class ParticipatedStudiesBank extends Component {
  render() {
    return (
      <>
        <Query query={ALL_PARTICIPATED_STUDIES_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const studies = data.myParticipatedStudies;
            return (
              <StyledBank>
                <div className="studies">
                  {studies.map(study => (
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
