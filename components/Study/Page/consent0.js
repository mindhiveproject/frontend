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
  state = {
    under18: false,
    parentConsent: false,
    englishComprehension: false,
  };

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
        id: this.props.id,
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
            <h2>Study consent</h2>
            <div>
              <fieldset>
                <label htmlFor="englishComprehension">
                  <input
                    type="checkbox"
                    id="englishComprehension"
                    name="englishComprehension"
                    onChange={this.saveToState}
                    checked={this.state.englishComprehension}
                  />
                  I understand basic instructions written in English
                </label>

                <h3>How would you like us to use your data?</h3>
                <div>
                  <label htmlFor="useDataForScience">
                    <input
                      type="radio"
                      id="useDataForScience"
                      name="data"
                      value="science"
                      onChange={this.updateState}
                      checked={this.state.data === 'science'}
                    />
                    You can use my data for science and/or educational purposes
                  </label>
                </div>
                <div>
                  <label htmlFor="educationalUse">
                    <input
                      type="radio"
                      id="educationalUse"
                      name="data"
                      value="education"
                      onChange={this.updateState}
                      checked={this.state.data === 'education'}
                    />
                    I want my data to be saved for educational use only (e.g.,
                    lectures and teaching materials)
                  </label>
                </div>
                <div>
                  <label htmlFor="doNotRecord">
                    <input
                      type="radio"
                      id="doNotRecord"
                      name="data"
                      value="no"
                      onChange={this.updateState}
                      checked={this.state.data === 'no'}
                    />
                    Don't record my data at all (if you’re a MindHive student:
                    this means your data won't be included in class demos!)
                  </label>
                </div>
                {this.state.data === 'science' && (
                  <div>
                    <label htmlFor="under18">
                      <input
                        type="checkbox"
                        id="under18"
                        name="under18"
                        onChange={this.saveToState}
                        checked={this.state.under18}
                      />
                      I am under the age of 18
                    </label>
                  </div>
                )}
                {this.state.data === 'science' && this.state.under18 && (
                  <div>
                    <label htmlFor="parentConsent">
                      Please ask your parent or guardian to check the box below
                      that they consent to your participation in this study.
                      <div>
                        <input
                          type="checkbox"
                          name="parentConsent"
                          id="parentConsent"
                          onChange={this.saveToState}
                          checked={this.state.parentConsent}
                        />
                        I consent
                      </div>
                    </label>
                  </div>
                )}

                <StyledButtons>
                  <Link
                    href={{
                      pathname: `/tasks/run`,
                      query: { id: study.id, policy: this.state.data },
                    }}
                  >
                    <button
                      onClick={e => this.saveJoinStudy(e, joinStudy)}
                      disabled={
                        !this.state.englishComprehension ||
                        !this.state.data ||
                        (this.state.data === 'science' &&
                          this.state.under18 &&
                          !this.state.parentConsent)
                      }
                    >
                      <a>
                        <h2>
                          {!this.state.englishComprehension ||
                          !this.state.data ||
                          (this.state.data === 'science' &&
                            this.state.under18 &&
                            !this.state.parentConsent)
                            ? 'Please answer all the questions above'
                            : 'I am ready to participate in this study'}{' '}
                        </h2>
                      </a>
                    </button>
                  </Link>
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
