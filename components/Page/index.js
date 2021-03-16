import React, { Component } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from '../Header/index';
import Footer from '../Footer/index';
import Meta from '../Meta/index';

import { StyledPage, Inner } from './styles';

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
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Meta />
        <StyledPage>
          <Header />
          <Inner>{this.props.children}</Inner>
          <Footer />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
