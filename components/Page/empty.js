import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from '../Header/index';
import Footer from '../Footer/index';
import Meta from '../Meta/index';
import Opening from '../Opening/index';

import { StyledPage, Inner, UserPage, UserInner } from './styles';

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
    height: 100vh;
  }
`;

class EmptyPage extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Meta />
        {this.props.children}
        <GlobalStyle />
        <Opening />
      </ThemeProvider>
    );
  }
}

export default EmptyPage;
