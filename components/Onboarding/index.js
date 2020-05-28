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
            <h3>
              This page is for students who are participating in the mindHIVE
              program, if you are a participant, please navigate to
              <Link
                href={{
                  pathname: '/bank',
                }}
              >
                <StyledLink> RESEARCH STUDIES</StyledLink>
              </Link>
              .
            </h3>

            <div>
              <h3>
                Have you already done onboarding? Then just
                <Link
                  href={{
                    pathname: '/login/invite',
                  }}
                >
                  <StyledLink> log in here </StyledLink>
                </Link>
                with your username.
              </h3>
            </div>
            <OnboardingSignupWithClassInvite />
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
