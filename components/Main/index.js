import Head from 'next/head';
import { Component } from 'react';
import { attributes, react as MainContent } from '../../content/main.md';

class Main extends Component {
  render() {
    const { title, links } = attributes;
    return (
      <>
        <article>
          <h1>{title}</h1>
          <MainContent />
        </article>
      </>
    );
  }
}

export default Main;
