import Head from 'next/head';
import { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';

import { StyledDocumentPage } from './styles';

class Document extends Component {
  render() {
    const { content, title, date } = this.props;
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>

        <StyledDocumentPage>
          <h1>{title}</h1>
          {ReactHtmlParser(content)}
        </StyledDocumentPage>
      </>
    );
  }
}

export default Document;
