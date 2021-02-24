import styled from 'styled-components';

export const StyledSidebar = styled.div`
  display: grid;
  margin-top: 33px;
  /* grid-template-rows: 100px 4fr 1fr; */
  grid-template-columns: 1fr;
  grid-gap: 40px;
  justify-items: left;
  align-content: start;
  padding-left: 30px;

  .navLinks {
    display: grid;
    align-items: center;
    grid-row-gap: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid #e6e6e6;
  }

  .navBottomLinks {
    display: grid;
    align-items: center;
    grid-row-gap: 31px;
  }

  .navLink {
    display: grid;
    grid-template-columns: 20px auto;
    grid-column-gap: 12px;
    cursor: pointer;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
  }

  .workspaceHeader {
    font-family: Lato;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    color: #b3b3b3;
    margin-top: 7px;
  }
`;

export const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  width: 100%;
  font-size: 2rem;
  align-items: center;
  a {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    font-weight: 800;
    color: ${props => props.theme.black} @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
    &:before {
      content: '';
      width: 2px;
      background: ${props => props.theme.lightgrey};
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(10deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: red;
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
  }
  @media (max-width: 700px) {
    // width: 100%;
    // justify-content: center;
    // font-size: 1.5rem;
  }
  .openMenuBtn {
    cursor: pointer;
    color: #666666;
    font-family: Lato;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    /* text-align: start; */
    padding-right: 2rem;
  }
`;

export const NavRightContainer = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(150px, auto)); */
  grid-column-gap: 6px;
  justify-content: end;
  @media (max-width: 700px) {
    justify-content: center;
  }
`;

export const NavRightContainerForAdmin = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, auto));
  grid-column-gap: 6px;
  justify-content: end;
  @media (max-width: 700px) {
    justify-content: center;
  }
`;

export const NavButton = styled.button`
  margin: 6px;
  height: 56px;
  /* height: 46px; */
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0.05em;
  color: #007c70;
  border: 2px solid #007c70;
  cursor: pointer;
  border-radius: 4px;
  padding: 14px 24px 14px 24px;
  background: none;
  align-items: center;
`;

export const NavButtonSecondary = styled.button`
  margin: 6px;
  height: 56px;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0.05em;
  color: #ffffff;
  border: 2px solid #007c70;
  cursor: pointer;
  border-radius: 4px;
  padding: 1rem 3rem;
  background: #007c70;
  align-items: center;
`;

export const SignoutButton = styled.button`
  width: 150px;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0.05em;
  color: #007c70;
  border: 2px solid #007c70;
  cursor: pointer;
  border-radius: 4px;
  padding: 14px 24px 14px 24px;
  background: none;
  align-items: center;
  margin-top: 8px;
`;
