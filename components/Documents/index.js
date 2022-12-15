import Head from 'next/head';
import { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import { StyledDocumentPage } from './styles';

import Carousel from './carousel';

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
          {title === 'About' && <Carousel />}
          {ReactHtmlParser(content)}
        </StyledDocumentPage>
      </>
    );
  }
}

export default Document;
