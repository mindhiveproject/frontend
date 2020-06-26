import styled from 'styled-components';

export const Logo = styled.a`
  @import url('https://fonts.googleapis.com/css?family=Montserrat');
  margin: 20px;
  display: grid;
  justify-items: start;
  cursor: pointer;
  @media (max-width: 1300px) {
    margin: 10px;
    text-align: center;
    justify-items: center;
  }
  .logo {
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

export const StyledHeader = styled.header`
  .bar {
    /* border-bottom: 3px solid ${props => props.theme.black}; */
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;
