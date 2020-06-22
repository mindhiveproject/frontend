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
    page: 1,
    zipCode: '',
    under18: false,
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

            <Link
              href={{
                pathname: `/study/${study.slug}`,
              }}
            >
              <a>X</a>
            </Link>
            {this.state.page == 1 && (
              <div id="page_1">
                <h1>Let's get started</h1>
                <p>
                  We are glad that you are interested in participating in "How
                  are we impacted during COVID-19?". Before we begin, please
                  answer the following:
                </p>
                <fieldset>
                  <div>
                    <label htmlFor="zipCode">
                      Your zip code
                      <input
                        type="number"
                        id="zipCode"
                        name="zipCode"
                        onChange={this.updateState}
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="englishComprehension">
                      <input
                        type="checkbox"
                        id="englishComprehension"
                        name="englishComprehension"
                        onChange={this.saveToState}
                        checked={this.state.englishComprehension}
                      />
                      Do you understand basic instruction written in English?
                    </label>
                  </div>
                  <div>
                    <label htmlFor="under18">
                      <input
                        type="checkbox"
                        id="under18"
                        name="under18"
                        onChange={this.saveToState}
                        checked={this.state.under18}
                      />
                      Are you under the age of 18?
                    </label>
                  </div>
                </fieldset>
                <button
                  onClick={() => this.setState({ page: this.state.page + 1 })}
                >
                  Next
                </button>
              </div>
            )}

            {this.state.page == 2 && (
              <div id="page_2">
                <h1>Study consent</h1>
                <p>Accordeon with the information here ...</p>
                <button
                  onClick={() => this.setState({ page: this.state.page + 1 })}
                >
                  Next
                </button>
              </div>
            )}

            {this.state.page == 3 && (
              <div id="page_3">
                <h1>Data usage</h1>
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
                <StyledButtons>
                  <button onClick={e => this.saveJoinStudy(e, joinStudy)}>
                    <a>
                      <h2>I am ready to participate in this study</h2>
                    </a>
                  </button>
                </StyledButtons>
              </div>
            )}

            {false && this.state.page == 4 && (
              <div id="page_4">
                <StudyRegistration study={study} user={this.state} />
              </div>
            )}
          </div>
        )}
      </Mutation>
    );
  }
}

export default StudyConsent;
