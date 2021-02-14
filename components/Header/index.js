import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from '../Nav/index';

import { StyledHeader, Logo } from './styles';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <div className="logo">
            <img src="/static/MindHive_logo.png" alt="icon" height="50" />
          </div>
        </Link>
      </Logo>
      <Nav />
    </div>
  </StyledHeader>
);

export default Header;
