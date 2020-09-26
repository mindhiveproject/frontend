import styled from 'styled-components';

export const StyledDasboard = styled.div`
  display: grid;
  padding: 20px;
  width: 100%;

  h1 {
    font-family: Lato;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 56px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
  }

  h2 {
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
  }

  a {
    cursor: pointer;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: #007c70;
  }
`;

export const StyledHomeDasboard = styled.div`
  width: 100%;
  display: grid;
  padding: 20px;

  .updatesBoard {
    display: grid;
    margin-top: 40px;
  }

  .updates {
    margin-top: 30px;
    display: grid;
    grid-row-gap: 25px;
  }
`;

export const StyledDiscoverDasboard = styled.div`
  width: 100%;
  display: grid;
  padding: 20px;

  .studies {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-column-gap: 26px;
    grid-row-gap: 26px;
    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }

  .tasks {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-column-gap: 26px;
    grid-row-gap: 26px;
    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }

  .surveys {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-column-gap: 26px;
    grid-row-gap: 26px;
    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }

  .discoverMenu {
    margin-bottom: 24px !important;

    .discoverMenuTitle {
      width: 150px;
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
//
// export const StyledStudyCard = styled.div`
//   background: #ffffff;
//   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09), 0px 5px 6px rgba(0, 0, 0, 0.08);
//   border-radius: 4px;
//   img {
//     width: 100%;
//     height: 166px;
//     object-fit: cover;
//   }
//   .cardInfo {
//     padding: 16px;
//   }
//   a {
//     letter-spacing: 0.04em;
//     text-decoration-line: underline;
//     color: #007c70;
//   }
//   h2 {
//     font-family: Roboto;
//     font-style: normal;
//     font-weight: normal;
//     font-size: 24px;
//     line-height: 30px;
//     color: #1a1a1a;
//   }
//   p {
//     font-family: Roboto;
//     font-style: normal;
//     font-weight: normal;
//     font-size: 12px;
//     line-height: 16px;
//     color: #969696;
//   }
// `;

export const StyledMessage = styled.div`
  display: grid;
  max-width: 560px;
  grid-template-columns: 4fr 1fr;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09), 0px 5px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #1a1a1a;
  }
  a {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    text-decoration-line: underline;
    color: #007c70;
  }
  .infoMessage {
    padding: 31px;
    border-right: 1px solid #ebebeb;
  }
  .linkMessage {
    padding: 10px;
    display: grid;
    align-items: center;
    justify-content: center;
  }
  .contextInfo {
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    color: #969696;
  }
`;

export const StyledDasboardPage = styled.div`
  padding: 20px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${props => props.open && `transform: translateX(0);`};
  header {
    border-bottom: 5px solid ${props => props.theme.black};
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  footer {
    /* border-top: 10px double ${props => props.theme.black}; */
    margin-top: 2rem;
    padding-top: 2rem;
    display: grid;
    grid-template-columns: auto;
    align-items: end;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    /* overflow: scroll; */
  }
  button {
    font-weight: 500;
    border: 1px solid grey;
    border-radius: 0;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 2rem;
    padding: 0.8rem 1.5rem;
    transform: skew(-2deg);
    display: inline-block;
    transition: all 0.5s;
    &[disabled] {
      opacity: 0.5;
    }
  }
`;

export const CartStyles = styled.div`
  padding: 20px;
  position: relative;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${props => props.open && `transform: translateX(0);`};
  header {
    border-bottom: 5px solid ${props => props.theme.black};
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  footer {
    /* border-top: 10px double ${props => props.theme.black}; */
    margin-top: 2rem;
    padding-top: 2rem;
    display: grid;
    grid-template-columns: auto;
    align-items: end;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    /* overflow: scroll; */
  }
  button {
    font-weight: 500;
    border: 1px solid grey;
    border-radius: 0;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 2rem;
    padding: 0.8rem 1.5rem;
    transform: skew(-2deg);
    display: inline-block;
    transition: all 0.5s;
    &[disabled] {
      opacity: 0.5;
    }
  }
`;

export const Supreme = styled.h3`
  background: ${props => props.theme.red};
  color: white;
  display: inline-block;
  padding: 4px 5px;
  transform: skew(-3deg);
  margin: 0;
  font-size: 4rem;
`;

export const CloseButton = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
`;

export const DashboardButton = styled.button`
  background: red;
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 2rem;
  padding: 0.8rem 1.5rem;
  transform: skew(-2deg);
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
`;

export const DashboardTable = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  a {
    border-bottom: 5px solid orange;
  }
`;

export const StyledProfilePicture = styled.div`
  padding: 10px;
  display: grid;
  justify-content: center;
`;

export const StyledButtons = styled.div`
  margin-top: 10px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  button {
    font-weight: 500;
    border: 1px solid grey;
    border-radius: 0;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 2rem;
    padding: 0.8rem 1.5rem;
    transform: skew(-2deg);
    display: inline-block;
    transition: all 0.5s;
    &[disabled] {
      opacity: 0.5;
    }
  }
  button: hover {
    background: rgb(246, 110, 94);
    a {
      color: white;
    }
  }
`;
