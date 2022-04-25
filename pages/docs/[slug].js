import React, { Component } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Page from '../../components/Page/index';
import Document from '../../components/Documents/index';

export const getStaticPaths = async () => {
  const files = fs.readdirSync('content/docs');
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMetadata = fs
    .readFileSync(path.join('content', 'docs', `${slug}.md`))
    .toString();
  const parsedMarkdown = matter(markdownWithMetadata);
  const htmlString = marked(parsedMarkdown.content);
  return {
    props: {
      content: htmlString,
      title: parsedMarkdown.data.title,
      date: parsedMarkdown.data.date.toString(),
    },
  };
};

const DocumentPage = ({ content, title, date }) => (
  <Page>
    <Document content={content} title={title} date={date} />
  </Page>
);

export default DocumentPage;
