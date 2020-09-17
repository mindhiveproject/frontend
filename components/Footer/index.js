import Link from 'next/link';
import { StyledFooter } from './styles';

const Footer = () => (
  <StyledFooter>
    <div className="infoPanel">
      <h1>MINDHIVE</h1>
      <p>
        MINDHIVE is a web-based citizen science platform that supports
        real-world brain and behavior research.
      </p>
      <p>
        MINDHIVE was designed for students & teachers who seek authentic STEM
        research experience, and for neuroscientists & cognitive/social
        psychologists who seek to address their research questions outside of
        the lab.
      </p>
      <p>© 2020</p>
    </div>

    <div className="linksPanel">
      <Link href="/docs/about">
        <p className="link">About</p>
      </Link>

      <Link href="/docs/contacts">
        <p className="link">Contact</p>
      </Link>

      <Link href="/docs/privacy">
        <p className="link">Privacy Policy</p>
      </Link>

      <Link href="/docs/terms">
        <p className="link">Terms & Conditions</p>
      </Link>
    </div>
  </StyledFooter>
);

export default Footer;
