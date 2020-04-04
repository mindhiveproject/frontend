import Head from 'next/head';
import { Component } from 'react';
import Link from 'next/link';
import { attributes, react as MainContent } from '../../content/main.md';
import { StyledButtons } from './styles';

class Main extends Component {
  render() {
    const { title, links } = attributes;
    return (
      <>
        <article>
          <h1>{title}</h1>
          <MainContent />
          <StyledButtons>
            <Link
              href={{
                pathname: '/bank',
              }}
            >
              <button>
                <a>
                  <h2>I'm a participant</h2>
                </a>
              </button>
            </Link>
            <Link
              href={{
                pathname: '/onboarding',
              }}
            >
              <button>
                <a>
                  <h2>I'm in a MINDHIVE class</h2>
                </a>
              </button>
            </Link>
          </StyledButtons>
        </article>
      </>
    );
  }
}

export default Main;
