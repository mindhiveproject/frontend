import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';

import { StyledBank } from '../styles';
import StudyCard from './studycard';

import { ALL_PUBLIC_STUDIES_QUERY } from '../../Queries/Study';

class StudiesBank extends Component {
  render() {
    return (
      <Query query={ALL_PUBLIC_STUDIES_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <></>;
          if (error) return <p>Error: {error?.message}</p>;
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
