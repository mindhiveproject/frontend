import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import Router from "next/router";
import { SignupForm, CreateAccountForm } from "../styles";
import Error from "../../ErrorMessage/index";
import { CURRENT_USER_RESULTS_QUERY } from "../../Queries/User";

import GoogleSignup from "../Google/index";

import { SIGNUP_MUTATION } from "../../Mutations/User";
import TermsConditions from "../TermsConditions";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    email: "",
  };

  saveToState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(emailSignUp, { error, loading }) => (
          <SignupForm>
            <CreateAccountForm
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await emailSignUp({
                  variables: { permissions: ["SCIENTIST"] },
                });
                this.setState({
                  username: "",
                  password: "",
                  email: "",
                  permissions: "",
                });
                Router.push({
                  pathname: `/dashboard`,
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h1>Sign up as a scientist</h1>
                <Error error={error} />
                <label htmlFor="email">
                  <p>Email address</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={this.saveToState}
                    required
                  />
                </label>
                <label htmlFor="username">
                  <p>Username</p>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={this.state.username}
                    onChange={this.saveToState}
                    required
                  />
                </label>
                <label htmlFor="password">
                  <p>Password</p>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={this.saveToState}
                    required
                  />
                </label>
                <button type="submit">Sign up</button>

                <GoogleSignup permissions={["SCIENTIST"]} />
                <TermsConditions
                  btnName={`"Sign up" or "Sign up with Google"`}
                />
              </fieldset>
            </CreateAccountForm>
          </SignupForm>
        )}
      </Mutation>
    );
  }
}

export default Signup;
