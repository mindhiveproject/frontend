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
          <ContainerOnlyForNoProfile>
            <h1>
              This page is for students who are participating in the MindHive
              program, if you are a participant, please navigate to
              <Link
                href={{
                  pathname: '/',
                }}
              >
                <StyledLink> RESEARCH STUDIES</StyledLink>
              </Link>
              .
            </h1>

            <h1>
              Have you already done onboarding? Then just
              <Link
                href={{
                  pathname: '/login',
                }}
              >
                <StyledLink> log in here </StyledLink>
              </Link>
              with your username.
            </h1>

            <h1>
              Otherwise,
              <Link
                href={{
                  pathname: '/signup/student',
                }}
              >
                <StyledLink> sign in here </StyledLink>
              </Link>
              as a student.
            </h1>

            {false && <OnboardingSignupWithClassInvite />}
          </ContainerOnlyForNoProfile>

          <ContainerOnlyForStudents>
            <HomeContent />
            <Lessons lessons={this.props.lessonsList} />
          </ContainerOnlyForStudents>
        </article>
      </>
    );
  }
}

export default Onboarding;
