import React, { Component } from 'react';
import fs from 'fs';
import Page from '../../components/Page/index';
import Documents from '../../components/Documents/index';

export const getStaticPaths = async () => {
  const files = fs.readdirSync('content/docs');
  console.log('files', files);
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));
  console.log('paths', paths);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => ({
  props: {
    slug,
  },
});

const Document = ({ slug }) => <div>Hello {slug}</div>;

// class Document extends Component {
//   static async getInitialProps({ query }) {
//     const { slug } = query;
//
//     const document = await import(`../../content/docs/${slug}.md`).catch(
//       error => null
//     );
//
//     return { document };
//   }
//
//   render() {
//     // if (!this.props.document) return <div>Document not found</div>;
//     console.log('this.props.document', this.props.document);
//
//     const {
//       attributes: { date, title, body },
//     } = this.props.document.default;
//
//     return (
//       <Page>
//         <Documents date={date} title={title} body={body} />
//       </Page>
//     );
//   }
// }

export default Document;
