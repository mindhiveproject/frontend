import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import { SignupForm, Dialog } from '../styles';

import JoinClass from './joinClass';

import { CLASS_QUERY } from '../../Queries/Class';

class SignUp extends Component {
  state = {
    activePage: this.props.classCode ? 'confirm' : 'code',
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
                    placeholder="e.g. test-class"
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
                        onClick={() =>
                          this.setState({
                            activePage: 'choose',
                            classCode: schoolclass.code,
                            classId: schoolclass.id,
                          })
                        }
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
            <JoinClass
              classCode={this.state.classCode.toLowerCase()}
              classId={this.state.classId}
            />
          )}
        </Dialog>
      </SignupForm>
    );
  }
}

export default SignUp;
