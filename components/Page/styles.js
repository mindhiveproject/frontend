import styled from 'styled-components';

export const UserPage = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Lato');
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  background: #f6f9f8;
  color: ${props => props.theme.grey};
  font-family: 'Lato';
  font-style: normal;
  font-weight: normal;
  font-size: 1.5rem;
  line-height: 1.6;
  display: grid;
  margin: 0;
  grid-gap: 10px;
  height: 100%;
  grid-template-columns: 225px auto;
  button:hover {
    opacity: .6;
  }
  a:hover {
    opacity: .6;
  }
`;

export const UserInner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  padding: 17px 2rem 2rem 17px;
  height: 101%;
  max-height: 100vh;
  overflow-y: auto;
  mask-image: linear-gradient(to top, transparent, black), linear-gradient(to left, transparent 17px, black 17px);
  mask-size: 100% 20000px;
  mask-position: left bottom;
  -webkit-mask-image: linear-gradient(to top, transparent, black), linear-gradient(to left, transparent 17px, black 17px);
  -webkit-mask-size: 100% 20000px;
  -webkit-mask-position: left bottom;
  transition: mask-position 0.3s, -webkit-mask-position 0.3s;

  :hover {
    -webkit-mask-position: left top;
  }
`;

export const UserNav = styled.div`
  display: grid;
  background: white;
  height: 101%;
  max-height: 100vh;
  overflow-y: hidden;

  :hover {
    overflow-y: auto;
  }
`;

export const StyledPage = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Lato');
  background: white;
  color: ${props => props.theme.grey};
  font-family: 'Lato';
  font-style: normal;
  font-weight: normal;
  font-size: 1.5rem;
  line-height: 1.6;
  display: grid;
  margin: 0;
  grid-gap: 10px;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-areas:
    'nav'
    'main'
    'footer';
  grid-template-rows: auto 1fr auto;

  a {
    text-decoration: none;
    color: ${props => props.theme.black};
  }
`;

export const Inner = styled.div`
  display: grid;
  grid-area: main;
  justify-items: center;
  padding: 2rem 0rem;
  margin-bottom: 93px;
  min-height: calc(100vh - 100px);
`;
