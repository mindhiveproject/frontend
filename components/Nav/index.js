import Link from 'next/link';
import { Mutation } from 'react-apollo';
import NavStyles from './styles';
import User from '../User/index';
// import Signout from '../Signout/index';

import { ContainerOnlyForNoProfile } from '../Permissions/NoProfile/index';
import { ContainerOnlyForStudents } from '../Permissions/Student/index';
import { ContainerOnlyForScientists } from '../Permissions/Scientist/index';
import { ContainerOnlyForParticipants } from '../Permissions/Participant/index';

import { TOGGLE_DASHBOARD_MUTATION } from '../Dashboard/index';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <ContainerOnlyForNoProfile>
          <Link href="/login">
            <a>Login</a>
          </Link>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </ContainerOnlyForNoProfile>

        <ContainerOnlyForScientists>
          <Link href="/templates/my">
            <a>My task templates</a>
          </Link>
          <Link href="/tasks/my">
            <a>My tasks</a>
          </Link>
          <Link href="/studies/my">
            <a>My studies</a>
          </Link>
          <Link href="/studies/all">
            <a>Research studies</a>
          </Link>
          <Link href="/classes">
            <a>Classes</a>
          </Link>
        </ContainerOnlyForScientists>

        <ContainerOnlyForStudents>
          <Link href="/bank">
            <a>Research studies</a>
          </Link>

          <Link href="/onboarding">
            <a>Student Onboarding</a>
          </Link>
        </ContainerOnlyForStudents>

        <ContainerOnlyForParticipants>
          <Link href="/studies/all">
            <a>Research studies</a>
          </Link>
        </ContainerOnlyForParticipants>

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
      </NavStyles>
    )}
  </User>
);

export default Nav;
