import React, { Component } from 'react';
import Page from '../../components/Page/index';

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
        <article>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </article>
        <style jsx>{`
          article {
            margin: 0 auto;
          }
          h1 {
            text-align: center;
          }
        `}</style>
      </Page>
    );
  }
}

export default Document;
