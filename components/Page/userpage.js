import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Meta from '../Meta/index';
import SidebarNav from '../Nav/sidebar';
import Login from '../Login/index';
import Page from './index';

import Error from '../ErrorMessage/index';
import { CURRENT_USER_QUERY } from '../Queries/User';

import { UserPage, UserInner, UserNav } from './styles';

import Opening from '../Opening/index';

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
    font-size: 12px;
    height: 100%;
    font-family: 'Lato';
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
  overflow: hidden;
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
            if (!data?.me)
              return (
                <Page>
                  <Login />
                </Page>
              );
            return (
              <UserPage>
                <UserNav>
                  <SidebarNav user={data?.me} />
                </UserNav>
                <UserInner>{this.props.children}</UserInner>
                <Opening />
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
