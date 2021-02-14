import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: grid;
  grid-area: nav;
  .bar {
    margin-top: 33px;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: start;
    @media (max-width: 700px) {
      /* grid-template-columns: 1fr;
      justify-content: center; */
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

export const Logo = styled.a`
  @import url('https://fonts.googleapis.com/css?family=Montserrat');
  display: grid;
  justify-items: start;
  cursor: pointer;
  @media (max-width: 700px) {
    text-align: center;
    justify-items: center;
  }
  .logo {
    margin-left: 20px;
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
  span {
    color: #28619e;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
  }
  img {
    margin-right: 10px;
  }
`;
