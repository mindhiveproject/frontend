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

const SidebarNav = ({ user }) => (
  <StyledSidebar>
    <Logo>
      <Link href="/">
        <div className="logoInSidebar">
          <img src="/static/MindHive_logo.png" alt="icon" width="150" />
        </div>
      </Link>
    </Logo>

    <div className="navLinks">
      <Link href="/dashboard">
        <div className="navLink">
          <div>
            <img
              src="/static/assets/dashboard-home.png"
              alt="icon"
              height="20"
            />
          </div>
          <div>Home</div>
        </div>
      </Link>

      <Link href="/dashboard/discover">
        <div className="navLink">
          <div>
            <img
              src="/static/assets/dashboard-discover.png"
              alt="icon"
              height="20"
            />
          </div>
          <div>Discover</div>
        </div>
      </Link>

      <div className="workspaceHeader">WORKSPACE</div>

      {(user?.permissions.includes('ADMIN') ||
        user?.permissions.includes('SCIENTIST') ||
        user?.permissions.includes('TEACHER') ||
        user?.permissions.includes('STUDENT')) && (
        <Link href="/dashboard/develop">
          <div className="navLink">
            <div>
              <img
                src="/static/assets/dashboard-create.png"
                alt="icon"
                height="20"
              />
            </div>
            <div>Develop</div>
          </div>
        </Link>
      )}

      <Link href="/dashboard/participate">
        <div className="navLink">
          <div>
            <img
              src="/static/assets/dashboard-participate.png"
              alt="icon"
              height="20"
            />
          </div>
          <div>Participate</div>
        </div>
      </Link>

      <Link href="/dashboard/follow">
        <div className="navLink">
          <div>
            <img
              src="/static/assets/dashboard-follow.png"
              alt="icon"
              height="20"
            />
          </div>
          <div>Follow</div>
        </div>
      </Link>

      {user?.permissions.includes('ADMIN') && (
        <>
          <div className="workspaceHeader">ADMIN</div>
          <Link href="/dashboard/overview">
            <div className="navLink">
              <div>
                <img
                  src="/static/assets/dashboard-create.png"
                  alt="icon"
                  height="20"
                />
              </div>
              <div>Overview</div>
            </div>
          </Link>
        </>
      )}
    </div>

    <div className="navBottomLinks">
      {user?.permissions.includes('TEACHER') && (
        <>
          <Link href="/dashboard/myclasses">
            <div className="navLink">
              <div>
                <img
                  src="/static/assets/dashboard-myclasses.svg"
                  alt="icon"
                  height="20"
                />
              </div>
              <div>My Classes</div>
            </div>
          </Link>
        </>
      )}
      <Link href="/dashboard/settings">
        <div className="navLink">
          <div>
            <img
              src="/static/assets/dashboard-settings.png"
              alt="icon"
              height="20"
            />
          </div>
          <div>Settings</div>
        </div>
      </Link>
      <Signout />
    </div>
  </StyledSidebar>
);

export default SidebarNav;
