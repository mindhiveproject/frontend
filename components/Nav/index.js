import Link from 'next/link';
import { Mutation } from 'react-apollo';
import NavStyles from './styles';
import User from '../User/index';
// import Signout from '../Signout/index';

import { TOGGLE_DASHBOARD_MUTATION } from '../Dashboard/index';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/bank">
          <a>Experiments</a>
        </Link>

        <Link href="/onboarding">
          <a>Student Onboarding</a>
        </Link>

        {me && (
          <>
            <Mutation mutation={TOGGLE_DASHBOARD_MUTATION}>
              {toggleDashboard => (
                <button onClick={toggleDashboard}>Dashboard</button>
              )}
            </Mutation>
          </>
        )}

        {!me && false && (
          <>
            <Link href="/signup">
              <a>Signup</a>
            </Link>

            <Link href="/login">
              <a>Login</a>
            </Link>
          </>
        )}

        <Link href="/">
          <a>Home</a>
        </Link>
      </NavStyles>
    )}
  </User>
);

export default Nav;
