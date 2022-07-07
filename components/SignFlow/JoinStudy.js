import React, { Component } from 'react';
import Link from 'next/link';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Router from 'next/router';

import joinStudyRedirect from './JoinStudyRedirect';

import { CURRENT_USER_RESULTS_QUERY } from '../Queries/User';

const JOIN_STUDY = gql`
  mutation JOIN_STUDY($id: ID!, $info: Json, $study: Json) {
    joinStudy(id: $id, info: $info, study: $study) {
      id
      username
      permissions
      studiesInfo
    }
  }
`;

class JoinStudy extends Component {
  saveJoinStudy = async (e, joinStudyMutation, consentGiven) => {
    e.preventDefault();
    const res = await joinStudyMutation({
      variables: {
        id: this.props.study.id,
        info: this.props.info,
        study: this.props.study,
      },
    });
    const { joinStudy } = res.data;
    joinStudyRedirect(this.props.study, joinStudy);
  };

  render() {
    const { study, user } = this.props;
    return (
      <Mutation
        mutation={JOIN_STUDY}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(joinStudy, { loading, error }) => (
          <button onClick={e => this.saveJoinStudy(e, joinStudy, true)}>
            Join the study
          </button>
        )}
      </Mutation>
    );
  }
}

export default JoinStudy;
