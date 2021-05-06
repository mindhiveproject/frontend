import styled from 'styled-components';

export const StyledPost = styled.form`
  display: grid;
  height: 100%;
  grid-row-gap: 10px;
  font-family: Lato;

  .proposalCardBoard {
    display: grid;
    grid-template-columns: 7fr 3fr;
  }

  .jodit-container {
    border: none !important;
  }

  /* .ui.modal > .content {
    padding: 0rem 0rem 0rem 0rem !important;
  } */

  label {
    display: block;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
  }
  input,
  textarea,
  select {
    border: 1px solid #cccccc;
    border-radius: 4px;
    width: 100%;
    font-size: 16px;
    line-height: 24px;
    padding: 12px;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.red};
    }
  }
  button,
  input[type='submit'] {
    margin-top: 3rem;
    margin-bottom: 1rem;
    width: 100%;
    background: #007c70;
    color: white;
    padding: 1.5rem 0.5rem;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 100%;
    border: 2px solid #007c70;
    border-radius: 4px;
    cursor: pointer;
  }
  h1 {
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 56px;
    letter-spacing: 0em;
    /* text-align: center; */
    margin-bottom: 40px;
  }
  p {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.05em;
  }
  fieldset {
    display: grid;
    justify-self: center;
    grid-gap: 5px;
    width: 100%;
    border: 0;
    padding: 0;
    &[disabled] {
      opacity: 0.5;
    }
  }
  .cardHeader {
    margin-bottom: 15px;
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: left;
  }
  .cardDescription {
    color: #666666;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    padding-bottom: 40px;
    margin-bottom: 44px;
    border-bottom: 2px solid #e6e6e6;
  }
  .textBoard {
    margin: 53px 30px 30px 96px;
  }
  .infoBoard {
    display: grid;
    grid-gap: 50px;
    align-content: baseline;
    background: #f7f9f8;
    border-radius: 0px 4px 4px 0px;
    padding: 53px 30px 30px 37px;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

export const StyledJodit = styled.div`
  height: 100%;
  input,
  textarea,
  select {
    width: 100%;
    &:focus {
      outline: 0;
      background: white;
      border-color: mintcream;
    }
  }
  button {
    background: transparent;
    margin: 1px;
    border: 0px solid #e6e6e6;
    cursor: pointer;
  }
`;
