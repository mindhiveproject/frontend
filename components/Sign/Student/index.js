import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { SignupForm, Dialog, SignupButton } from '../styles';
import StudentSignup from './emailSignup';
import GoogleSignup from '../Google/index';

const CLASS_QUERY = gql`
  query CLASS_QUERY($code: String!) {
    class(where: { code: $code }) {
      id
      title
      description
      image
      code
      creator {
        id
        username
      }
    }
  }
`;

class SignUp extends Component {
  state = {
    activePage: 'code',
    classCode: this.props.classCode || '',
  };

  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <SignupForm>
        <Dialog>
          {this.state.activePage === 'code' && (
            <div className="enterCodeScreen">
              <h1>Enter your class code</h1>
              <div>
                <label htmlFor="classCode">
                  <p>Class code</p>
                  <input
                    type="text"
                    id="classCode"
                    name="classCode"
                    placeholder="e.g. p13bgd"
                    onChange={this.updateState}
                    value={this.state.classCode}
                  />
                  <div className="helpMessage">
                    This code is provided by your teacher and is how you will
                    join your class.
                  </div>
                </label>
              </div>
              <button
                onClick={() => {
                  if (this.state.classCode) {
                    this.setState({ activePage: 'confirm' });
                  } else {
                    alert('Please enter your class code');
                  }
                }}
              >
                Next
              </button>
            </div>
          )}

          {this.state.activePage === 'confirm' && (
            <Query
              query={CLASS_QUERY}
              variables={{ code: this.state.classCode.toLowerCase() }}
            >
              {({ error, loading, data }) => {
                console.log('data', data);
                if (error) return <Error error={error} />;
                if (loading) return <p>Loading</p>;
                if (!data.class)
                  return (
                    <div className="classFoundScreen">
                      <h1>
                        No class found for the code{' '}
                        <i>{this.state.classCode}</i>
                      </h1>
                      <button
                        className="primaryBtn"
                        onClick={() => this.setState({ activePage: 'code' })}
                      >
                        Go back
                      </button>
                    </div>
                  );

                const schoolclass = data.class;
                return (
                  <div className="classFoundScreen">
                    <h1>Do you want to join the following class?</h1>

                    <div className="classInformation">
                      {schoolclass.title} - {schoolclass.creator.username}
                    </div>

                    <div className="navigationBtns">
                      <button
                        className="secondaryBtn"
                        onClick={() => this.setState({ activePage: 'code' })}
                      >
                        No, go back
                      </button>
                      <button
                        className="primaryBtn"
                        onClick={() => this.setState({ activePage: 'choose' })}
                      >
                        Yes, continue
                      </button>
                    </div>
                  </div>
                );
              }}
            </Query>
          )}

          {this.state.activePage === 'choose' && (
            <>
              <h1>How would you like to join MindHive?</h1>
              <div className="studentSignupOptions">
                <SignupButton
                  onClick={() => {
                    this.setState({ activePage: 'createAccount' });
                  }}
                >
                  <div>
                    <img
                      src="/static/assets/signup-email.png"
                      alt="icon"
                      height="20"
                    />
                  </div>
                  <div>Sign up with email/username</div>
                </SignupButton>

                <GoogleSignup
                  class={{ code: this.state.classCode.toLowerCase() }}
                  permissions={['STUDENT']}
                />
              </div>
            </>
          )}

          {this.state.activePage === 'createAccount' && (
            <>
              <StudentSignup
                class={{ code: this.state.classCode.toLowerCase() }}
              />
            </>
          )}
        </Dialog>
      </SignupForm>
    );
  }
}

export default SignUp;
