import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import Nav from '../Nav/index';

import { StyledHeader, Logo, MainNavLink } from './styles';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => {
  const router = useRouter();

  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <Link href="/">
            <div className="logo">
              <img src="/static/MindHive_logo.png" alt="icon" height="50" />
            </div>
          </Link>
        </Logo>

        <div className="links">
          <Link href="/discover">
            <MainNavLink
              selected={
                router.pathname === '/discover' || router.pathname === '/'
              }
            >
              Discover
            </MainNavLink>
          </Link>
          <Link href="/docs/about">
            <MainNavLink
              selected={
                router.pathname === '/docs/[slug]' &&
                router.query.slug === 'about'
              }
            >
              About
            </MainNavLink>
          </Link>
        </div>
        <Nav />
      </div>
    </StyledHeader>
  );
};

export default Header;
