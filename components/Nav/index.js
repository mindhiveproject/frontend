import Link from 'next/link';
import { Mutation } from 'react-apollo';
import {
  NavStyles,
  NavRightContainer,
  NavButton,
  NavButtonSecondary,
} from './styles';
import User from '../User/index';
// import Signout from '../Signout/index';

import { ContainerOnlyForNoProfile } from '../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../Permissions/Student/index';
import { ContainerOnlyForScientists } from '../Permissions/Scientist/index';
import { ContainerOnlyForParticipants } from '../Permissions/Participant/index';
import { ContainerOnlyForTeachers } from '../Permissions/Teacher/index';

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
              <NavButtonSecondary>Signup</NavButtonSecondary>
            </Link>
          </NavRightContainer>
        </ContainerOnlyForNoProfile>

        <ContainerOnlyForScientists>
          <NavRightContainer>
            <Link href="/irb/my">
              <NavButton>IRB protocols</NavButton>
            </Link>
            <Link href="/templates/my">
              <NavButton>Templates</NavButton>
            </Link>
            <Link href="/task/my">
              <NavButton>Tasks</NavButton>
            </Link>
            <Link href="/study/my">
              <NavButton>Studies</NavButton>
            </Link>
            {me && (
              <Link href="/dashboard">
                <NavButton>Dashboard</NavButton>
              </Link>
            )}
          </NavRightContainer>
        </ContainerOnlyForScientists>

        <ContainerOnlyForTeachers>
          <NavRightContainer>
            <Link href="/classes/my">
              <NavButton>Classes</NavButton>
            </Link>
            {me && (
              <Link href="/dashboard">
                <NavButton>Dashboard</NavButton>
              </Link>
            )}
          </NavRightContainer>
        </ContainerOnlyForTeachers>

        <ContainerOnlyForStudents>
          <NavRightContainer>
            {false && (
              <Link href="/study/all">
                <NavButton>Research studies</NavButton>
              </Link>
            )}

            {false && (
              <Link href="/onboarding">
                <NavButton>Student Onboarding</NavButton>
              </Link>
            )}

            {me && (
              <Link href="/dashboard">
                <NavButton>Dashboard</NavButton>
              </Link>
            )}
          </NavRightContainer>
        </ContainerOnlyForStudents>

        <ContainerOnlyForParticipants>
          <NavRightContainer>
            {false && (
              <Link href="/study/all">
                <NavButton>Research studies</NavButton>
              </Link>
            )}
            {me && (
              <Link href="/dashboard">
                <NavButton>Dashboard</NavButton>
              </Link>
            )}
          </NavRightContainer>
        </ContainerOnlyForParticipants>

        {false && (
          <ContainerOnlyForProfile>
            <NavRightContainer>
              {me && (
                <Link href="/dashboard">
                  <NavButton>Dashboard</NavButton>
                </Link>
              )}
            </NavRightContainer>
          </ContainerOnlyForProfile>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;

// <Mutation mutation={TOGGLE_DASHBOARD_MUTATION}>
//   {toggleDashboard => (
//     <NavButton onClick={toggleDashboard}>Dashboard</NavButton>
//   )}
// </Mutation>
