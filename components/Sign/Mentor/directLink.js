import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import { SignupForm, Dialog } from '../styles';

import JoinClass from './joinClass';

import { CLASS_QUERY } from '../../Queries/Class';

class SignUp extends Component {
  state = {
    activePage: 'confirm',
    classCode: this.props.classCode || '',
  };

  render() {
    return (
      <SignupForm>
        <Dialog>
          {this.state.activePage === 'confirm' && (
            <Query
              query={CLASS_QUERY}
              variables={{ code: this.props.classCode }}
            >
              {({ error, loading, data }) => {
                if (error) return <Error error={error} />;
                if (loading) return <p>Loading</p>;

                if (!data.class)
                  return (
                    <div className="classFoundScreen">
                      <h1>
                        No class found for the code{' '}
                        <i>{this.props.classCode}</i>.
                      </h1>
                    </div>
                  );

                const schoolclass = data.class;

                const mentorInvitationCode =
                  schoolclass?.settings?.mentorInvitationCode;
                if (this.props.invite !== mentorInvitationCode)
                  return (
                    <div className="classFoundScreen">
                      <h1>The invitation link has expired</h1>
                      <p>
                        Contact the creator of the class to get the actual
                        invitation link.
                      </p>
                    </div>
                  );

                return (
                  <div className="classFoundScreen">
                    <h1>
                      Do you want to join the following class as a mentor?
                    </h1>

                    <div className="classInformation">
                      {schoolclass.title} - {schoolclass.creator.username}
                    </div>

                    <div>
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
