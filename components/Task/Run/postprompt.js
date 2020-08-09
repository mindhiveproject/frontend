import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {
  OnboardingForm,
  ResponseButtons,
  OnboardingHeader,
} from '../../Study/styles';

const UPDATE_RESULTS_INFO_MUTATION = gql`
  mutation UPDATE_RESULTS_INFO_MUTATION($id: ID!, $info: Json) {
    updateResultsInfo(id: $id, info: $info) {
      message
    }
  }
`;

class PostPrompt extends Component {
  state = {
    linking: 'all',
  };

  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e, updateResultsMutation) => {
    console.log('submit data', this.state);
    e.preventDefault();
    const res = await updateResultsMutation({
      variables: {
        id: this.props.token,
        info: {
          policy: this.props.policy,
          linking: this.state.linking,
          study: {
            slug: this.props.slug,
            id: this.props.study,
          },
        },
      },
    });
    console.log('res', res);
    // change the page
    Router.push('/studies/[slug]', `/studies/${this.props.slug}`);
    // Router.push({
    //   pathname: '/dashboard',
    // });
  };

  render() {
    return (
      <Mutation mutation={UPDATE_RESULTS_INFO_MUTATION} variables={this.state}>
        {(updateResult, { error }) => (
          <div>
            <OnboardingForm>
              <h1>Thank you for participating!</h1>
              <p>
                Before proceeding, we'd like to confirm with you that you're ok
                with other MindHive researchers linking your responses to their
                study. This will prevent that you have to answer the same
                questions multiple times.
              </p>
              <p>
                Recall that (a) you always have to right to request that your
                data be removed, at any time and for any reason (b) we will
                never sell your data (c) we will never share any identifiable
                data (name, email address, etc.).
              </p>

              <div>
                <div className="checkboxField">
                  <input
                    type="radio"
                    id="linkToAll"
                    name="linking"
                    value="all"
                    onChange={this.updateState}
                    checked={this.state.linking === 'all'}
                  />
                  <label htmlFor="linkToAll">
                    Other researchers may link my MindHive data to their study
                  </label>
                </div>
              </div>
              <div>
                <div className="checkboxField">
                  <input
                    type="radio"
                    id="linkToStudy"
                    name="linking"
                    value="study"
                    onChange={this.updateState}
                    checked={this.state.linking === 'study'}
                  />
                  <label htmlFor="linkToStudy">
                    I only want my data to be linked to the study{' '}
                    {this.props.slug}
                  </label>
                </div>
              </div>
              <button onClick={e => this.onSubmit(e, updateResult)}>
                Next
              </button>
            </OnboardingForm>
          </div>
        )}
      </Mutation>
    );
  }
}

export default PostPrompt;
