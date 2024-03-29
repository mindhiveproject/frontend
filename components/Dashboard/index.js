import React, { Component } from 'react';
import { Query, Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import Link from 'next/link';
import { CURRENT_USER_STUDIES_QUERY } from '../Queries/User';
import {
  CartStyles,
  Supreme,
  CloseButton,
  DashboardButton,
  DashboardTable,
  StyledProfilePicture,
  StyledButtons,
} from './styles';
import ResultPane from '../Results/Pane/index';
import Signout from '../Signout/index';
import { ContainerOnlyForStudents } from '../Permissions/Student/index';
import LeaveStudy from '../Study/Leave/index';

// use @client to look at only client (and do not check the server )
const LOCAL_STATE_QUERY = gql`
  query {
    dashboardOpen @client
  }
`;

const TOGGLE_DASHBOARD_MUTATION = gql`
  mutation {
    toggleDashboard @client
  }
`;

/* eslint-disable */
// compose all components together
const Composed = adopt({
  user: ({ render }) => (
    <Query query={CURRENT_USER_STUDIES_QUERY}>{render}</Query>
  ),
  toggleDashboard: ({ render }) => (
    <Mutation mutation={TOGGLE_DASHBOARD_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});
/* eslint-enable */

class Dashboard extends Component {
  render() {
    return (
      <Composed>
        {({ user, toggleDashboard, localState }) => {
          if (!user.data) return null;
          const { me } = user.data;
          if (!me) return null;
          return (
            <CartStyles open={localState.data.dashboardOpen}>
              <header>
                <CloseButton title="close" onClick={toggleDashboard}>
                  &times;
                </CloseButton>
                <Supreme>{me.username}'s dashboard</Supreme>
                <h1>
                  {me.permissions.map((permission, i) => (
                    <div key={i}>{permission}</div>
                  ))}
                </h1>

                <ContainerOnlyForStudents>
                  <StyledProfilePicture>
                    <img src={me.image} height="200px" alt="" />
                  </StyledProfilePicture>
                  <DashboardTable>
                    <h3>Your classes</h3>
                    <div>
                      <ul>
                        {me.studentIn.map(schoolclass => (
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
                    You have {me.results.length} result
                    {me.results.length === 1 ? '' : 's'}{' '}
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

                {me.participantIn.length > 0 && (
                  <>
                    <h3>You participate in studies</h3>
                    <div>
                      <ul>
                        {me.participantIn.map(study => (
                          <div key={study.id}>
                            <Link
                              href="/studies/[slug]"
                              as={`/studies/${study.slug}`}
                            >
                              <a>
                                <button>{study.title}</button>
                              </a>
                            </Link>
                            <LeaveStudy id={study.id} />
                          </div>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {false && (
                  <>
                    <p>You are {me.permissions}</p>
                    <p>
                      You have {me.results.length} result
                      {me.results.length === 1 ? '' : 's'}{' '}
                    </p>
                    <ul>
                      {me.results.map(result => (
                        <ResultPane key={result.id} result={result} />
                      ))}
                    </ul>
                  </>
                )}
              </header>

              <footer>
                <Signout />
              </footer>
            </CartStyles>
          );
        }}
      </Composed>
    );
  }
}

export default Dashboard;
export { LOCAL_STATE_QUERY, TOGGLE_DASHBOARD_MUTATION };
