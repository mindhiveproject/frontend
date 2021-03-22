import styled from 'styled-components';

export const StyledPost = styled.form`
  display: grid;
  /* justify-self: center;
  justify-content: center;
  align-content: center; */
  grid-row-gap: 10px;
  font-family: Lato;
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
    text-align: center;
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
`;

export const StyledJodit = styled.div`
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
