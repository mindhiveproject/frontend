import React, { Component } from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import {
  NavStyles,
  NavRightContainer,
  NavButton,
  NavButtonSecondary,
} from './styles';
import User from '../User/index';

import { ContainerOnlyForNoProfile } from '../Permissions/NoProfile/index';
import { ContainerOnlyForProfile } from '../Permissions/Profile/index';
import { ContainerOnlyForStudents } from '../Permissions/Student/index';
import { ContainerOnlyForScientists } from '../Permissions/Scientist/index';
import { ContainerOnlyForParticipants } from '../Permissions/Participant/index';
import { ContainerOnlyForTeachers } from '../Permissions/Teacher/index';

const MenuModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background: white;
  overflow: auto;
  .menuWrapper {
    display: grid;
    justify-content: center;
    width: 100%;
  }
  .menu {
    min-width: 300px;
  }
  .menuHeader {
    display: grid;
    justify-content: end;
  }
  .closeBtn {
    color: #5f6871;
    cursor: pointer;
    text-align: end;
    font-size: 40px;
  }
  .menuLinks {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    padding: 16px;
  }
`;

class Nav extends Component {
  state = { activePage: 'main' };

  onOpenMenu = () => {
    this.setState({
      activePage: 'menu',
    });
  };

  onCloseMenu = () => {
    this.setState({
      activePage: 'main',
    });
  };

  render() {
    if (this.state.activePage === 'menu') {
      return (
        <MenuModal>
          <div className="menuWrapper">
            <div className="menu">
              <div className="menuHeader">
                <a className="closeBtn" onClick={this.onCloseMenu}>
                  &times;
                </a>
              </div>
              <div className="menuLinks">
                <Link href="/login">
                  <NavButton>Login</NavButton>
                </Link>
                <Link href="/signup">
                  <NavButtonSecondary>Signup</NavButtonSecondary>
                </Link>
              </div>
            </div>
          </div>
        </MenuModal>
      );
    }

    if (this.state.activePage === 'main') {
      return (
        <User>
          {({ data: { me } }) => (
            <NavStyles>
              <ContainerOnlyForNoProfile>
                <NavRightContainer>
                  <div className="openMenuBtn" onClick={this.onOpenMenu}>
                    Menu
                  </div>
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
    }
  }
}

export default Nav;

// <Link href="/login">
//   <NavButton>Login</NavButton>
// </Link>
// <Link href="/signup">
//   <NavButtonSecondary>Signup</NavButtonSecondary>
// </Link>

// <Mutation mutation={TOGGLE_DASHBOARD_MUTATION}>
//   {toggleDashboard => (
//     <NavButton onClick={toggleDashboard}>Dashboard</NavButton>
//   )}
// </Mutation>
