import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Error from '../../ErrorMessage/index';
import { USER_DASHBOARD_QUERY } from '../../User/index';

import Signout from '../../Signout/index';
import LeaveStudy from '../../Study/Leave/index';

import UniversalBlock from './block';

import {
  CartStyles,
  Supreme,
  CloseButton,
  DashboardButton,
  DashboardTable,
  StyledProfilePicture,
  StyledButtons,
  StyledDasboardPage,
} from '../styles';

// permissions
import { ContainerOnlyForStudents } from '../../Permissions/Student/index';

class DashboardStatic extends Component {
  render() {
    return (
      <Query query={USER_DASHBOARD_QUERY}>
        {({ data, loading, error }) => {
          console.log('data', data);
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.me) return <p>No user found. Please sign up or login.</p>;

          return (
            <StyledDasboardPage>
              <Supreme>{data.me.username}'s dashboard</Supreme>

              {data.me.participantIn.length > 0 && (
                <>
                  <h3>You participate in studies</h3>
                  <div>
                    <ul>
                      {data.me.participantIn.map(study => (
                        <div key={study.id}>
                          <div>
                            <Link
                              href="/studies/[slug]"
                              as={`/studies/${study.slug}`}
                            >
                              <a>
                                <button>{study.title}</button>
                              </a>
                            </Link>
                          </div>
                          <LeaveStudy id={study.id} />
                          <div>
                            <h2>Messages</h2>
                            {study.messages.map(message => (
                              <p>{message.content}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <ContainerOnlyForStudents>
                <StyledProfilePicture>
                  <img src={data.me.image} height="200px" alt="" />
                </StyledProfilePicture>
                <DashboardTable>
                  <h3>Your classes</h3>
                  <div>
                    <ul>
                      {data.me.studentIn.map(schoolclass => (
                        <div key={schoolclass.id}>
                          <Link
                            href={{
                              pathname: '/class',
                              query: { id: schoolclass.id },
                            }}
                          >
                            <a>{schoolclass.title}</a>
                          </Link>
                        </div>
                      ))}
                    </ul>
                  </div>
                </DashboardTable>
                <p>
                  You have {data.me.results.length} result
                  {data.me.results.length === 1 ? '' : 's'}{' '}
                </p>
                <StyledButtons>
                  <Link
                    href={{
                      pathname: '/res/my',
                    }}
                  >
                    <a>
                      <button>See my results</button>
                    </a>
                  </Link>

                  <Link
                    href={{
                      pathname: '/bank/mycustom',
                    }}
                  >
                    <a>
                      <button>My research studies</button>
                    </a>
                  </Link>
                </StyledButtons>
              </ContainerOnlyForStudents>

              {data.me.teacherIn && data.me.teacherIn.length ? (
                <div>
                  <h2>Classes where you are a teacher</h2>
                  <UniversalBlock data={data.me.teacherIn} />
                </div>
              ) : (
                <div></div>
              )}

              {data.me.researcherIn && data.me.researcherIn.length ? (
                <div>
                  <h2>Studies where you are a researcher</h2>
                  <UniversalBlock data={data.me.researcherIn} />
                </div>
              ) : (
                <div></div>
              )}

              {data.me.collaboratorInStudy &&
              data.me.collaboratorInStudy.length ? (
                <div>
                  <h2>Studies where you are a collaborator</h2>
                  <UniversalBlock data={data.me.collaboratorInStudy} />
                </div>
              ) : (
                <div></div>
              )}

              {data.me.taskCreatorIn && data.me.taskCreatorIn.length ? (
                <div>
                  <h2>Tasks which you have created</h2>
                  <UniversalBlock data={data.me.taskCreatorIn} />
                </div>
              ) : (
                <div></div>
              )}

              {data.me.collaboratorInTask &&
              data.me.collaboratorInTask.length ? (
                <div>
                  <h2>Tasks where you are a collaborator</h2>
                  <UniversalBlock data={data.me.collaboratorInTask} />
                </div>
              ) : (
                <div></div>
              )}

              <footer>
                <Signout />
              </footer>
            </StyledDasboardPage>
          );
        }}
      </Query>
    );
  }
}

export default DashboardStatic;
