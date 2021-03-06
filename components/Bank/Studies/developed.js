import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import Link from 'next/link';
import styled from 'styled-components';
import { StyledBank, StyledStudyCard, StyledZeroState } from '../styles';
import StudyCard from './studycard';

const MY_DEVELOPED_STUDIES_QUERY = gql`
  query MY_DEVELOPED_STUDIES_QUERY {
    myStudies {
      id
      title
      slug
      image
      author {
        id
      }
      collaborators {
        id
        username
      }
      public
      shortDescription
    }
  }
`;

class DevelopedStudiesBank extends Component {
  render() {
    return (
      <>
        <Query query={MY_DEVELOPED_STUDIES_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const studies = data.myStudies;
            if (studies.length === 0) {
              return (
                <StyledZeroState>
                  <div className="message">
                    <h2>You haven't developed a study yet.</h2>
                    <p>
                      Once you develop your first study, it will appear here.
                    </p>
                  </div>
                </StyledZeroState>
              );
            }
            return (
              <StyledBank>
                <div className="studies">
                  {studies.map(study => (
                    <StudyCard
                      key={study.id}
                      study={study}
                      onSelectStudy={this.props.onSelectStudy}
                      user={this.props.user}
                      developingMode
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

export default DevelopedStudiesBank;
export { MY_DEVELOPED_STUDIES_QUERY };
