import Head from 'next/head';
import { Component } from 'react';
import { attributes, react as HomeContent } from '../../content/home.md';
import OnboardingSignupWithClassInvite from '../Sign/Invite/onboarding';
import { ContainerOnlyForNoProfile } from '../Permissions/NoProfile/index';
import { ContainerOnlyForStudents } from '../Permissions/Student/index';

class Onboarding extends Component {
  render() {
    const { title, links } = attributes;
    return (
      <>
        <Head>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Head>
        <article>
          <h1>{title}</h1>
          <HomeContent />
          <ContainerOnlyForNoProfile>
            <OnboardingSignupWithClassInvite />
          </ContainerOnlyForNoProfile>
          <ContainerOnlyForStudents>
            It looks like you have already logged in. Please proceed to the
            onboarding page for further instructions.
          </ContainerOnlyForStudents>
        </article>
      </>
    );
  }
}

export default Onboarding;
