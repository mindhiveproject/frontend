import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { SignupForm, Dialog, SignupButton } from '../styles';
import StudentSignup from './emailSignup';
import GoogleSignup from './googleSignup';

const CLASS_QUERY = gql`
  query CLASS_QUERY($code: String!) {
    class(where: { code: $code }) {
      id
      title
      description
      image
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
            <>
              <h1>Enter your class code</h1>
              <div>
                <label htmlFor="classCode">
                  <p>Class code</p>
                  <input
                    type="text"
                    id="classCode"
                    name="classCode"
                    placeholder="e.g. P13bGD"
                    onChange={this.updateState}
                    value={this.state.classCode}
                  />
                </label>
              </div>
              <button onClick={() => this.setState({ activePage: 'confirm' })}>
                Next
              </button>
            </>
          )}

          {this.state.activePage === 'confirm' && (
            <Query
              query={CLASS_QUERY}
              variables={{ code: this.state.classCode }}
            >
              {({ error, loading, data }) => {
                console.log('data', data);
                if (error) return <Error error={error} />;
                if (loading) return <p>Loading</p>;
                if (!data.class)
                  return (
                    <>
                      <h1>
                        No class found for the code{' '}
                        <i>{this.state.classCode}</i>
                      </h1>
                      <button
                        onClick={() => this.setState({ activePage: 'code' })}
                      >
                        Go back
                      </button>
                    </>
                  );

                const schoolclass = data.class;
                return (
                  <>
                    <h1>Do you want to join the following class?</h1>
                    <h1>{schoolclass.title}</h1>
                    <p>{schoolclass.description}</p>
                    by <h3>{schoolclass.creator.username}</h3>
                    <button
                      onClick={() => this.setState({ activePage: 'code' })}
                    >
                      No, go back
                    </button>
                    <button
                      onClick={() => this.setState({ activePage: 'choose' })}
                    >
                      Yes, continue
                    </button>
                  </>
                );
              }}
            </Query>
          )}

          {this.state.activePage === 'choose' && (
            <>
              <h1>How would you like to join MindHive?</h1>
              <SignupButton
                onClick={() => {
                  this.setState({ activePage: 'createAccount' });
                }}
              >
                Sign up with email/username
              </SignupButton>

              <GoogleSignup class={{ code: this.state.classCode }} />
            </>
          )}

          {this.state.activePage === 'createAccount' && (
            <>
              <StudentSignup class={{ code: this.state.classCode }} />
            </>
          )}
        </Dialog>
      </SignupForm>
    );
  }
}

export default SignUp;
