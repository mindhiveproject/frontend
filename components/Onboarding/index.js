import Head from 'next/head';
import { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { attributes, react as HomeContent } from '../../content/home.md';
import OnboardingSignupWithClassInvite from '../Sign/Invite/onboarding';
import { ContainerOnlyForNoProfile } from '../Permissions/NoProfile/index';
import { ContainerOnlyForStudents } from '../Permissions/Student/index';
import Lessons from '../Lessons/index';

export const StyledLink = styled.span`
  border-bottom: 5px solid orange;
  cursor: pointer;
`;

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
            <div>
              <h3>
                Have you already done onboarding? Then just
                <Link
                  href={{
                    pathname: '/login/invite',
                  }}
                >
                  <StyledLink> login here </StyledLink>
                </Link>
                with your username.
              </h3>
            </div>
          </ContainerOnlyForNoProfile>
          <ContainerOnlyForStudents>
            <div>
              <h3>
                Before you begin the MINDHIVE program, we want to learn a bit
                about you!
              </h3>
            </div>
            <div>
              We’d like to know a few things about your research interests and
              your current knowledge about brain and behavior research. This is
              not a test! We are just interested in getting to know you a bit
              better so that (a) we can give you the proper guidance through
              your mindHIVE journey, (b) we can better understand how
              participating in the program may affect your attitudes towards
              science, and (c) we can improve the program for future users.
            </div>
            <Lessons lessons={this.props.lessonsList} />
          </ContainerOnlyForStudents>
        </article>
      </>
    );
  }
}

export default Onboarding;
