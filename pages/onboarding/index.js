import React, { Component } from 'react';
import Page from '../../components/Page/index';
import Onboarding from '../../components/Onboarding/index';

const importLessons = async () => {
  // https://medium.com/@shawnstern/importing-multiple-markdown-files-into-a-react-component-with-webpack-7548559fce6f
  // second flag in require.context function is if subdirectories should be searched
  const markdownFiles = require
    .context('../../content/lessons', false, /\.md$/)
    .keys()
    .map(relativePath => relativePath.substring(2));
  // console.log('markdownFiles', markdownFiles);
  return Promise.all(
    markdownFiles.map(async path => {
      const markdown = await import(`../../content/lessons/${path}`);
      // console.log('markdown', markdown);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

export default class LessonsPage extends Component {
  static async getInitialProps() {
    const lessonsList = await importLessons();
    return { lessonsList };
  }

  render() {
    const { lessonsList } = this.props;
    return (
      <Page>
        <Onboarding lessonsList={lessonsList} />
      </Page>
    );
  }
}
