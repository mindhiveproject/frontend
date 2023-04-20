import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";

import { SignupForm, CreateAccountForm } from "../styles";
import Error from "../../ErrorMessage/index";
import { CURRENT_USER_RESULTS_QUERY } from "../../Queries/User";
import joinStudyRedirect from "../../SignFlow/JoinStudyRedirect";

import { SIGNUP_MUTATION } from "../../Mutations/User";
import TermsConditions from "../TermsConditions";

class ParticipantSignup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    info: { ...this.props.info, updates: true }, // all information that is coming from the registration forms
    study: this.props.study,
  };

  saveToState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  saveToInfoState = (e) => {
    this.setState({
      info: {
        ...this.state.info,
        [e.target.name]: e.target.value,
      },
    });
  };

  toggleState = (e) => {
    this.setState({
      info: {
        ...this.state.info,
        [e.target.name]: !this.state.info[e.target.name],
      },
    });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_RESULTS_QUERY }]}
      >
        {(participantSignUp, { error, loading }) => (
          <SignupForm>
            <CreateAccountForm
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await participantSignUp({
                  variables: { permissions: ["PARTICIPANT"] },
                });
                const { signUp } = res.data;
                this.setState({ username: "", password: "", email: "" });
                joinStudyRedirect(this.props.study, signUp);
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h1>Create your account</h1>
                <Error error={error} />
                <label htmlFor="username">
                  <p>Username</p>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={this.state.username}
                    onChange={this.saveToState}
                  />
                  {false && (
                    <div className="helpText">
                      Proceed with the name we suggest or choose your own.
                    </div>
                  )}
                </label>
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

                <div>
                  <label htmlFor="updates">
                    <div className="checkboxField">
                      <input
                        type="checkbox"
                        id="updates"
                        name="updates"
                        checked={this.state.info.updates}
                        onChange={this.toggleState}
                      />
                      <span>
                        I agree to receive notifications and updates related to
                        the studies I follow. NB: you can change your settings
                        at any time in the Dashboard {">"} Account Settings. If
                        you uncheck this box, you will be asked to decide on a
                        case-by-case basis.
                      </span>
                    </div>
                  </label>
                </div>

                <button type="submit">Create account</button>
                <TermsConditions btnName={`"Create account"`} />
              </fieldset>
            </CreateAccountForm>
          </SignupForm>
        )}
      </Mutation>
    );
  }
}

export default ParticipantSignup;
