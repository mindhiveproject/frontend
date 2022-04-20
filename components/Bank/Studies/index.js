import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import { StyledBank } from '../styles';
import StudyCard from './studycard';

const ALL_PUBLIC_STUDIES_QUERY = gql`
  query ALL_PUBLIC_STUDIES_QUERY {
    studies {
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
      public
      image
      description
      tasks {
        id
      }
    }
  }
`;

// const ALL_PUBLIC_STUDIES_QUERY = gql`
//   query ALL_PUBLIC_STUDIES_QUERY {
//     studies {
//       id
//       title
//       slug
//       author {
//         id
//         permissions
//       }
//       collaborators {
//         id
//         permissions
//       }
//       participants {
//         id
//       }
//       guests {
//         id
//       }
//       public
//       image
//       description
//       tasks {
//         id
//       }
//       components
//     }
//   }
// `;

class StudiesBank extends Component {
  render() {
    return (
      <Query query={ALL_PUBLIC_STUDIES_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <></>;
          if (error) return <p>Error: {error.message}</p>;
          const { studies } = data;
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
    );
  }
}

export default StudiesBank;
