import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import Meta from '../Meta/index';
import SidebarNav from '../Nav/sidebar';

import Error from '../ErrorMessage/index';
import { CURRENT_USER_QUERY } from '../User/index';

import { UserPage, UserInner, UserNav } from './styles';

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#666666',
  white: '#FFFFFF',
  yellow: 'yellow',
  lightgrey: '#E1E1E1',
  darkgreen: '#007C70',
  offWhite: '#EDEDED',
  maxWidth: '1300px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
    height: 100%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    display: grid;
    height: 100%;
  }
`;

class AuthorizedPage extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Meta />
        <Query query={CURRENT_USER_QUERY}>
          {({ data, loading, error }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading</p>;
            if (!data.me) return <p>No user found. Please sign up or login.</p>;
            return (
              <UserPage>
                <UserNav>
                  <SidebarNav />
                </UserNav>
                <UserInner>{this.props.children}</UserInner>
              </UserPage>
            );
          }}
        </Query>
        <GlobalStyle />
      </ThemeProvider>
    );
  }
}

export default AuthorizedPage;
