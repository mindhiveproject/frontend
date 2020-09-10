import Head from 'next/head';
import { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

class Document extends Component {
  render() {
    const { content, title, date } = this.props;
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <article>
          <div>{ReactHtmlParser(content)}</div>
        </article>
      </>
    );
  }
}

export default Document;
