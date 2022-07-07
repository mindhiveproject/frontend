import styled from 'styled-components';

export const StyledPublicUserPage = styled.div`
  display: grid;
  margin: 30px 20px;
`;

export const StyledAccount = styled.div`
  display: grid;
  max-width: 1200px;
  width: 100%;
  justify-self: center;
  padding: 2rem;
  grid-template-columns: 1fr;
  grid-gap: 5rem;
  align-items: baseline;

  .profile {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
    justify-items: start;
    align-content: baseline;

    @media only screen and (max-width: 800px) {
      grid-template-columns: 1fr;
      justify-items: center;
    }

    .profileContainer {
      display: grid;
      grid-gap: 2rem;
      padding: 1rem;
      .firstLine {
        display: grid;
        grid-gap: 2rem;
        grid-template-columns: 1fr 3fr;
        .image {
          height: 100%;
          img {
            height: 100%;
            width: 100%;
          }
        }
        @media only screen and (max-width: 500px) {
          grid-template-columns: 1fr;
          justify-items: center;
        }
        .avatar {
          cursor: pointer;
        }
        .snsLinks {
          padding: 0.5rem 0rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
          align-items: center;
        }
        .websiteInfo {
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: auto 1fr;
        }
      }
      .secondLine {
        display: grid;
        grid-template-columns: 1fr auto;

        @media only screen and (max-width: 500px) {
          grid-template-columns: 1fr;
        }

        .username {
          h1 {
            font-size: 3rem;
            font-weight: 500;
          }
        }
      }
      .thirdLine {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(5, auto);
        color: var(--lightBlack);
        justify-content: space-between;
        @media only screen and (max-width: 500px) {
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        }
      }
      .fourthLine {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(3, 1fr);
        justify-content: stretch;
        width: 100%;
        height: 100%;

        @media only screen and (max-width: 500px) {
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        }

        button {
          min-width: 150px;
          width: 100%;
          height: auto;
          font-size: 1.8rem;
          padding: 1rem;
          color: #ffffff;
          background: #007c70;
          border: 2px solid #007c70;
          border-radius: 4px;
          cursor: pointer;
        }
        button: hover {
          transition: background-color 0.5s ease;
          background: white;
          color: #007c70;
        }
        .followed: hover {
          transition: background-color 0.5s ease;
          background: var(--pink);
          color: white;
        }
      }
    }
    .bioContainer {
      display: grid;
      grid-template-rows: 1fr auto;
      grid-gap: 1rem;
      padding: 1rem;
      h2 {
        margin-bottom: 20px;
      }
      span {
        background: #e9ecef;
        border-radius: 100px;
        padding: 10px 15px;
        margin: 0px 10px 0px 0px;
        cursor: pointer;
        color: #212529;
      }
      .bio {
        overflow-y: auto;
        max-height: 200px;
      }
      .wallet {
        display: grid;
        .walletAddress {
          color: var(--darkGreen);
        }
      }
    }
  }

  .display {
    display: grid;
    grid-gap: 2rem;
    .studyDescriptionCard {
      padding: 2rem;
      margin-bottom: 2rem;
      background: #ffffff;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
      border-radius: 8px;
    }
  }
`;
