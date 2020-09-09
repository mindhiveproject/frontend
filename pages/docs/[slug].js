import React, { Component } from 'react';
import Page from '../../components/Page/index';
import Documents from '../../components/Documents/index';

class Document extends Component {
  static async getInitialProps({ query }) {
    const { slug } = query;

    const document = await import(`../../content/docs/${slug}.md`).catch(
      error => null
    );

    return { document };
  }

  render() {
    if (!this.props.document) return <div>Document not found</div>;

    const {
      attributes: { date, title, body },
    } = this.props.document.default;

    return (
      <Page>
        <Documents date={date} title={title} body={body} />
      </Page>
    );
  }
}

export default Document;
