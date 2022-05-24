import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';
import StudyCard from './card';

import { StyledSelectionScreen } from '../selectScreen';

const StyledBankToClone = styled.div`
  display: grid;
  justify-content: center;
  margn: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(315px, 1fr));
  grid-gap: 20px;
  margin: 20px;
`;

// const ALL_PUBLIC_STUDIES_TO_CLONE_QUERY = gql`
//   query ALL_PUBLIC_STUDIES_TO_CLONE_QUERY {
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
//       shortDescription
//       tasks {
//         id
//       }
//     }
//   }
// `;

const MY_AND_PUBLIC_STUDIES_TO_CLONE_QUERY = gql`
  query MY_AND_PUBLIC_STUDIES_TO_CLONE_QUERY {
    myAndPublicStudies {
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
      shortDescription
      tasks {
        id
      }
    }
  }
`;

class ChooseStudyToClone extends Component {
  onSelectStudy = study => {
    this.props.onChoiceToClone(study);
  };

  render() {
    return (
      <StyledSelectionScreen>
        <div className="selectionHeader">
          <div className="goBackBtn">
            <span onClick={this.props.onReturn}>
              ← Go back to previous step
            </span>
          </div>
          <div className="closeBtn">
            <span onClick={this.props.onClose}>&times;</span>
          </div>
        </div>

        <div className="selectionBody">
          <div className="selectHeader">
            <h1>Clone & modify a study</h1>
            <p>Select which study you would like to clone below.</p>
          </div>

          <Query query={MY_AND_PUBLIC_STUDIES_TO_CLONE_QUERY}>
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const studies = data?.myAndPublicStudies || [];
              return (
                <StyledBankToClone>
                  {studies.map(study => (
                    <StudyCard
                      key={study.id}
                      study={study}
                      onSelectStudy={this.onSelectStudy}
                    />
                  ))}
                </StyledBankToClone>
              );
            }}
          </Query>
        </div>
      </StyledSelectionScreen>
    );
  }
}

export default ChooseStudyToClone;
