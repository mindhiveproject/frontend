import React, { Component } from 'react';

class Document extends Component {
  static async getInitialProps({ query }) {
    const { slug } = query;

    const document = await import(`../../../content/docs/${slug}.md`).catch(
      error => null
    );

    return { document };
  }

  render() {
    if (!this.props.document) return <div>The document not found</div>;

    const {
      html,
      attributes: { title, date },
    } = this.props.document.default;
    console.log('html', this.props.document.default);

    return (
      <>
        <article>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
        <style jsx>{`
          article {
            margin: 0 auto;
          }
          h1 {
            text-align: center;
          }
        `}</style>
      </>
    );
  }
}

export default Document;
