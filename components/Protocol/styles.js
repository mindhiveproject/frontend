import styled from 'styled-components';

export const StyledNavigation = styled.div`
  a {
    cursor: pointer;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    color: #007c70;
  }

  .discoverMenu {
    margin-bottom: 24px !important;

    .discoverMenuTitle {
      width: 200px;
      padding-bottom: 10px !important;
      display: grid;
      justify-content: center;
      border-bottom: 2px solid #e6e6e6;
      p {
        font-family: Lato;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: 0em;
        color: #666666;
      }
    }
    .selectedMenuTitle {
      border-bottom: 4px solid #ffc107 !important;
      p {
        color: #1a1a1a;
      }
    }
  }
`;

export const StyledViewProtocolPage = styled.div`
  display: grid;
  grid-gap: 2rem;
`;
