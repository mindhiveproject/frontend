import styled from 'styled-components';

export const StyledReviewSection = styled.div`
  background: #e5e5e5;
  display: grid;
  justify-content: stretch;
`;

export const StyledReviewBoard = styled.div`
  display: grid;
  max-width: 1100px;
  margin: 45px 0px 45px 0px;
  width: 100%;
  justify-self: center;

  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'submit submit'
    'checklist reviews';
  grid-gap: 20px;

  .submit {
    grid-area: submit;
    .submitPanel {
      display: grid;
      grid-template-columns: 4fr 3fr;
    }
    .submitBtnContainer {
      display: grid;
      justify-content: end;
      align-content: baseline;
      button {
        border: 2px solid #b3b3b3;
      }
    }
  }
  .checklist {
    grid-area: checklist;
    .checklistItems {
      display: grid;
      grid-gap: 10px;
      margin-top: 18px;
    }
  }
  .reviews {
    grid-area: reviews;
    .reviewsCards {
      display: grid;
      grid-gap: 10px;
      .allReviewsToggle {
        cursor: pointer;
        color: #007c70;
        font-family: Lato;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: left;
        text-decoration-line: underline;
      }
    }
    .reviewsPlaceholder {
      border: 1px solid #e6e6e6;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 40px;
      p {
        text-align: center;
      }
    }
  }
`;

export const StyledReviewCard = styled.div`
  background: white;
  border-radius: 4px;
  padding: 41px 50px 21px 50px;
  h2 {
    font-family: Lato;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: left;
    color: #1a1a1a;
  }
  p {
    font-family: Lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
  .dropdown {
    background: #fff9e6;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    border-radius: 1rem;
  }
`;
