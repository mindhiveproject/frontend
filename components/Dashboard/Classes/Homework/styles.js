import styled from 'styled-components';

export const StyledEditor = styled.div`
  .header {
    display: grid;
    justify-content: end;
  }
  .closeBtn {
    line-height: 3rem;
    text-align: center;
    cursor: pointer;
    border-radius: 2.25rem;
    color: #5f6871;
    font-size: 2rem;
    cursor: pointer;
    :hover {
      transform: scale(1.5);
      transition: transform 0.5s;
      color: red;
    }
  }
`;

export const StyledSelectionScreen = styled.div`
  display: grid;
  background: #f7f9f8;
`;

export const StyledPost = styled.form`
  display: grid;
  height: 100%;
  grid-row-gap: 10px;
  font-family: Lato;
  font-size: 18px;

  .proposalCardBoard {
    display: grid;
    grid-template-columns: 7fr 3fr;
  }

  .jodit-container {
    border: none !important;
  }

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
    margin: 0px 10px;
  }
  .infoBoard {
    display: grid;
    grid-gap: 20px;
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
    height: 100%;
  }
  .proposalCardComments {
    display: grid;
  }
`;

export const StyledButtons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  justify-items: end;
  grid-gap: 10px;
  .primary {
    background: #007c70;
    color: #ffffff;
    border: 2px solid #007c70;
  }
  .secondary {
    background: #ffffff;
    color: #666666;
    border: 2px solid #b3b3b3;
  }
`;

export const StyledButton = styled.button`
  cursor: pointer;
  border-radius: 4px;
  align-items: center;
  padding: 14px 24px;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: center;
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
