import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Radio } from 'semantic-ui-react';

import { USER_DASHBOARD_QUERY } from '../../User/index';

const StyledHideToggle = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto 1fr;
`;

const UPDATE_USER_STUDY_HIDE_IN_DEVELOP = gql`
  mutation UPDATE_USER_STUDY_HIDE_IN_DEVELOP(
    $studyId: ID!
    $isHidden: Boolean!
  ) {
    updateUserStudyHideInDevelop(studyId: $studyId, isHidden: $isHidden) {
      message
    }
  }
`;

class ToggleUserStudyHide extends Component {
  render() {
    return (
      <Mutation
        mutation={UPDATE_USER_STUDY_HIDE_IN_DEVELOP}
        variables={{ studyId: this.props.id, isHidden: !this.props.isHidden }}
        refetchQueries={[{ query: USER_DASHBOARD_QUERY }]}
      >
        {(updateHiddenStatusStudy, { data, loading, error }) => {
          if (loading) {
            return <div>Updating ...</div>;
          }
          return (
            <StyledHideToggle>
              <Radio
                toggle
                checked={!this.props.isHidden}
                onChange={() => {
                  updateHiddenStatusStudy().catch(err => {
                    alert(err.message);
                  });
                }}
              />
              <span>{this.props.isHidden ? 'Hidden' : 'Visible'}</span>
            </StyledHideToggle>
          );
        }}
      </Mutation>
    );
  }
}

export default ToggleUserStudyHide;
