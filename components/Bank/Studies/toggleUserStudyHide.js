import React, { Component } from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { Button } from 'semantic-ui-react';

import { USER_DASHBOARD_QUERY } from '../../User/index';

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
            <Button
              style={{background: '#007C70', color: '#FFFFFF'}}
              content={this.props.isHidden ? 'Unarchive' : 'Archive'}
              onClick={() => {
                updateHiddenStatusStudy().catch(err => {
                  alert(err.message);
                });
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default ToggleUserStudyHide;
