import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import { SimpleForm } from '../../Styles/Forms';
import Error from '../../ErrorMessage/index';
import { CURRENT_USER_RESULTS_QUERY } from '../../User/index';
import { ALL_CLASSES_QUERY } from '../../Class/All/index';
import { REVIEW_CLASS_QUERY } from '../../Class/Review/index';

import {
  StyledInterestItem,
  StyledOtherInterestItem,
  StyledOnboardingLoginForm,
} from './styles';

const INVITE_SIGNUP_MUTATION = gql`
  mutation INVITE_SIGNUP_MUTATION(
    $username: String!
    $invitedIn: ID!
    $image: String
    $largeImage: String
    $info: Json
  ) {
    inviteSignUp(
      username: $username
      invitedIn: $invitedIn
      image: $image
      largeImage: $largeImage
      info: $info
    ) {
      id
      username
      permissions
    }
  }
`;

class OnboardingSignupWithClassInvite extends Component {
  state = {
    username: '',
    image: '',
    largeImage: '',
    uploadingImage: false,
  };

  handleInfoChange = e => {
    const { name, type, value } = e.target;
    let val = type === 'number' ? parseFloat(value) : value;
    if (type === 'checkbox') {
      const { interests } = this.state.info;
      const { id } = e.target;
      if (interests.includes(id)) {
        interests.splice(interests.indexOf(id), 1);
      } else {
        interests.push(id);
      }
      val = interests;
    }
    this.setState({
      info: {
        ...this.state.info,
        [name]: val,
      },
    });
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  // method for uploading images
  uploadImage = async e => {
    // console.log('uploading image');
    this.setState({
      uploadingImage: true,
    });
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'mindhive');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/mindhive/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();
    console.log('file', file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
      uploadingImage: false,
    });
  };

  render() {
    return (
      <Query query={ALL_CLASSES_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const { classes } = data;
          return (
            <>
              <Mutation
                mutation={INVITE_SIGNUP_MUTATION}
                variables={this.state}
                refetchQueries={[
                  { query: CURRENT_USER_RESULTS_QUERY },
                  {
                    query: REVIEW_CLASS_QUERY,
                    variables: { id: this.state.invitedIn },
                  },
                ]}
              >
                {(inviteSignUp, { error, loading }) => (
                  <SimpleForm
                    method="post"
                    onSubmit={async e => {
                      e.preventDefault();
                      const res = await inviteSignUp();
                      console.log('res', res);
                      this.setState({ username: '' });
                      Router.push({
                        pathname: '/onboarding',
                      });
                    }}
                  >
                    <fieldset disabled={loading} aria-busy={loading}>
                      <Error error={error} />

                      <div>
                        <strong>
                          Let’s start with the most important part: your
                          username and profile picture! This information will be
                          visible to other people who visit the platform.
                        </strong>
                      </div>

                      <div>
                        For example, if your science hero is Marie Curie, you
                        can pick her name and a picture of her. Feel free to
                        discuss with your peers in the next 5 minutes or so!
                      </div>

                      <StyledOnboardingLoginForm>
                        <label htmlFor="invitedIn">
                          Class
                          <select
                            type="text"
                            name="invitedIn"
                            placeholder="invitedIn"
                            value={this.state.invitedIn}
                            onChange={this.handleChange}
                            required
                          >
                            <option value="">
                              {' '}
                              --- Choose your class ---{' '}
                            </option>
                            {classes.map(schoolclass => (
                              <option
                                value={schoolclass.id}
                                key={schoolclass.id}
                              >
                                {schoolclass.title}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label htmlFor="username">
                          Username (not your real name)
                          <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                          />
                        </label>
                        <label htmlFor="image">
                          Profile picture (not of your face)
                          <input
                            type="file"
                            id="image"
                            name="image"
                            placeholder="Upload an image"
                            onChange={this.uploadImage}
                          />
                          {this.state.image && (
                            <img
                              src={this.state.image}
                              width="200"
                              alt="Upload avatar"
                            />
                          )}
                        </label>

                        <div>
                          <strong>
                            Write down your username so you can remember it!
                          </strong>
                        </div>

                        {this.state.uploadingImage && (
                          <div>Uploading image ...</div>
                        )}
                      </StyledOnboardingLoginForm>
                      <button
                        type="submit"
                        disabled={this.state.uploadingImage}
                      >
                        Enter
                      </button>
                    </fieldset>
                  </SimpleForm>
                )}
              </Mutation>
            </>
          );
        }}
      </Query>
    );
  }
}

export default OnboardingSignupWithClassInvite;
