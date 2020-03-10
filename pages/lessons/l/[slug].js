import React, { Component } from 'react';

class Post extends Component {
  static async getInitialProps({ query }) {
    console.log('query', query);
    const { slug } = query;

    const blogpost = await import(`../../../content/lessons/${slug}.md`).catch(
      error => null
    );

    return { blogpost };
  }

  render() {
    if (!this.props.blogpost) return <div>not found</div>;

    const {
      html,
      attributes: { thumbnail, title },
    } = this.props.blogpost.default;
    console.log('html', this.props.blogpost.default);

    return (
      <>
        <article>
          <h1>{title}</h1>
          <img src={thumbnail} height="100px" />
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

export default Post;
