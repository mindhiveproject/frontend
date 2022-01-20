import React, { Component } from 'react';
import Link from 'next/link';
import { Mutation } from '@apollo/client/react/components';
import styled from 'styled-components';
import {
  NavStyles,
  NavRightContainer,
  NavRightContainerForAdmin,
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
                  <NavButton>Log in</NavButton>
                </Link>
                <Link href="/signup">
                  <NavButtonSecondary>Sign up</NavButtonSecondary>
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
          {data => (
            <NavStyles>
              <ContainerOnlyForNoProfile>
                <NavRightContainer>
                  {false && (
                    <div className="openMenuBtn" onClick={this.onOpenMenu}>
                      Menu
                    </div>
                  )}
                  <div className="menuLinks">
                    <Link href="/login">
                      <NavButton>Log in</NavButton>
                    </Link>
                    <Link href="/signup">
                      <NavButtonSecondary>Sign up</NavButtonSecondary>
                    </Link>
                  </div>
                </NavRightContainer>
              </ContainerOnlyForNoProfile>

              <ContainerOnlyForScientists>
                <NavRightContainerForAdmin>
                  <Link href="/irb/my">
                    <NavButton>IRB protocols</NavButton>
                  </Link>
                </NavRightContainerForAdmin>
              </ContainerOnlyForScientists>

              <ContainerOnlyForProfile>
                <NavRightContainer>
                  {data?.data?.me && (
                    <Link href="/dashboard">
                      <NavButton>Dashboard</NavButton>
                    </Link>
                  )}
                </NavRightContainer>
              </ContainerOnlyForProfile>
            </NavStyles>
          )}
        </User>
      );
    }
  }
}

export default Nav;
