import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { NavStyles, NavRightContainer, NavButton } from './styles';
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
          <NavRightContainer>
            <Link href="/login">
              <NavButton>Login</NavButton>
            </Link>
            <Link href="/signup">
              <NavButton>Signup</NavButton>
            </Link>
          </NavRightContainer>
        </ContainerOnlyForNoProfile>

        <ContainerOnlyForScientists>
          <NavRightContainer>
            <Link href="/templates/my">
              <NavButton>My task templates</NavButton>
            </Link>
            <Link href="/tasks/my">
              <NavButton>My tasks</NavButton>
            </Link>
            <Link href="/studies/my">
              <NavButton>My studies</NavButton>
            </Link>
            <Link href="/studies/all">
              <NavButton>Research studies</NavButton>
            </Link>
            <Link href="/classes">
              <NavButton>Classes</NavButton>
            </Link>
            {me && (
              <Mutation mutation={TOGGLE_DASHBOARD_MUTATION}>
                {toggleDashboard => (
                  <NavButton onClick={toggleDashboard}>Dashboard</NavButton>
                )}
              </Mutation>
            )}
          </NavRightContainer>
        </ContainerOnlyForScientists>

        <ContainerOnlyForStudents>
          <NavRightContainer>
            <Link href="/bank">
              <NavButton>Research studies</NavButton>
            </Link>
            <Link href="/onboarding">
              <NavButton>Student Onboarding</NavButton>
            </Link>
            {me && (
              <Mutation mutation={TOGGLE_DASHBOARD_MUTATION}>
                {toggleDashboard => (
                  <NavButton onClick={toggleDashboard}>Dashboard</NavButton>
                )}
              </Mutation>
            )}
          </NavRightContainer>
        </ContainerOnlyForStudents>

        <ContainerOnlyForParticipants>
          <NavRightContainer>
            <Link href="/studies/all">
              <NavButton>Research studies</NavButton>
            </Link>
            {me && (
              <Mutation mutation={TOGGLE_DASHBOARD_MUTATION}>
                {toggleDashboard => (
                  <NavButton onClick={toggleDashboard}>Dashboard</NavButton>
                )}
              </Mutation>
            )}
          </NavRightContainer>
        </ContainerOnlyForParticipants>
      </NavStyles>
    )}
  </User>
);

export default Nav;
