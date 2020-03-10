import React, { Component } from 'react';
import Page from '../../components/Page/index';
import Lessons from '../../components/Lessons/index';

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
        <div>
          <h3>
            Before you begin the MINDHIVE program, we want to learn a bit about
            you!
          </h3>
        </div>
        <div>
          We’d like to know a few things about your research interests and your
          current knowledge about brain and behavior research. This is not a
          test! We are just interested in getting to know you a bit better so
          that (a) we can give you the proper guidance through your mindHIVE
          journey, (b) we can better understand how participating in the program
          may affect your attitudes towards science, and (c) we can improve the
          program for future users.
        </div>
        <Lessons lessons={lessonsList} />
      </Page>
    );
  }
}
