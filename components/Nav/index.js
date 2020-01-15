import Link from 'next/link';
import NavStyles from './styles';

const Nav = () => (
  <NavStyles>

    <Link href="/">
      <a>Dashboard</a>
    </Link>

    <Link href="/test">
      <a>Experiments</a>
    </Link>

    <Link href="/journal">
        <a>Journal</a>
    </Link>

    <Link href="/resources">
        <a>Recources</a>
    </Link>

  </NavStyles>
)

export default Nav;
