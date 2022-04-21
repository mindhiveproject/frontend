import styled from 'styled-components';

const StyledMenu = styled.div`
  display: grid;

  .menu {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    margin: 20px 6px 29px 6px !important;
    cursor: pointer;

    .menuTitle {
      padding-bottom: 10px !important;
      display: grid;
      justify-content: center;
      border-bottom: 2px solid #e6e6e6;
      p {
        font-size: 18px;
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

export default StyledMenu;
