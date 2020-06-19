import React, { Component } from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { StyledStudy, StyledLink, StyledButtons } from '../styles';

import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';

const JOIN_STUDY = gql`
  mutation JOIN_STUDY($id: ID!, $info: Json) {
    joinStudy(id: $id, info: $info) {
      message
    }
  }
`;

class StudyConsent extends Component {
  state = {};

  saveToState = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  saveJoinStudy = async (e, joinStudyMutation) => {
    e.preventDefault();
    const res = await joinStudyMutation({
      variables: {
        id: this.props.study.id,
        info: this.state,
      },
    });
  };

  render() {
    const { study } = this.props;

    return (
      <Mutation
        mutation={JOIN_STUDY}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(joinStudy, { loading, error }) => (
          <div>
            <h2>Join the study</h2>
            <div>
              <fieldset>
                <StyledButtons>
                  <button onClick={e => this.saveJoinStudy(e, joinStudy)}>
                    <a>
                      <h2>I am ready to participate in this study</h2>
                    </a>
                  </button>
                </StyledButtons>
              </fieldset>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default StudyConsent;
