import Head from 'next/head';
import { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

class Onboarding extends Component {
  render() {
    const { date, title, body } = this.props;
    return (
      <>
        <Head>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Head>
        <article>
          <div>{ReactHtmlParser(body)}</div>
        </article>
      </>
    );
  }
}

export default Onboarding;
