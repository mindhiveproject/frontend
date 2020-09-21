import React, { Component } from 'react';

import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

import Signout from '../Signout/index';

import { Logo } from '../Header/styles';
import {
  StyledSidebar,
  NavStyles,
  NavRightContainer,
  NavButton,
  NavButtonSecondary,
} from './styles';

const SidebarNav = () => (
  <StyledSidebar>
    <Logo>
      <Link href="/">
        <div className="logoInSidebar">
          <img src="/static/MindHive_logo.png" alt="icon" height="50" />
        </div>
      </Link>
    </Logo>

    <div className="navLinks">
      <Link href="/dashboard">
        <div className="navLink">
          <div>+</div>
          <div>Home</div>
        </div>
      </Link>

      <Link href="/dashboard/participate">
        <div className="navLink">
          <div>+</div>
          <div>Discover</div>
        </div>
      </Link>

      <Link href="/dashboard/create">
        <div className="navLink">
          <div>+</div>
          <div>Create</div>
        </div>
      </Link>
    </div>

    <footer>
      <Link href="/dashboard/settings">
        <div className="navLink">
          <div>+</div>
          <div>Settings</div>
        </div>
      </Link>
      <Signout />
    </footer>
  </StyledSidebar>
);

export default SidebarNav;
