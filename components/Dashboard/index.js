import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import Link from 'next/link';
import { CURRENT_USER_RESULTS_QUERY } from '../User/index';
import {
  CartStyles,
  Supreme,
  CloseButton,
  DashboardButton,
  DashboardTable,
} from './styles';
import ResultPane from '../Results/Pane/index';
import Signout from '../Signout/index';

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
  user: ({ render }) => <Query query={ CURRENT_USER_RESULTS_QUERY }>{render}</Query>,
  toggleDashboard: ({ render }) => <Mutation mutation={TOGGLE_DASHBOARD_MUTATION}>{render}</Mutation>,
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
})
/* eslint-enable */

class Dashboard extends Component {
  render() {
    return (
      <Composed>
        {({ user, toggleDashboard, localState }) => {
          if (!user.data) return null;
          const { me } = user.data;
          console.log('me', me);
          if (!me) return null;
          return (
            <CartStyles open={localState.data.dashboardOpen}>
              <header>
                <CloseButton title="close" onClick={toggleDashboard}>
                  &times;
                </CloseButton>
                <Supreme>{me.username}'s dashboard</Supreme>

                <DashboardTable>
                  <div>
                    <h3>Your classes</h3>
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

                    <h3>Your interests</h3>
                    <ul>
                      {me.info &&
                        me.info.interests
                          .filter(i => !i.startsWith('other'))
                          .map(i => <li key={i}>{i}</li>)}
                      <li>{me.info && me.info.other1}</li>
                      <li>{me.info && me.info.other2}</li>
                      <li>{me.info && me.info.other3}</li>
                      <li>{me.info && me.info.other4}</li>
                    </ul>
                  </div>

                  <img src={me.image} height="200px" alt="" />
                </DashboardTable>

                {false && (
                  <>
                    <p>You are {me.permissions}</p>
                    <p>
                      You have {me.results.length} result
                      {me.results.length === 1 ? '' : 's'}{' '}
                    </p>
                    <Link
                      href={{
                        pathname: '/res/my',
                      }}
                    >
                      <a>
                        <DashboardButton>See my results</DashboardButton>
                      </a>
                    </Link>
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
