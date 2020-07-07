import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;

export const Dialog = styled.div`
  display: grid;
  text-align: initial;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-top: 2rem;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
  }
  input,
  textarea,
  select {
    font-family: Lato;
    margin-bottom: 1rem;
    height: 48px;
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
    font-family: Lato;
    margin-top: 3rem;
    margin-bottom: 3rem;
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
`;

export const SignupForm = styled.div`
  font-family: Lato;
  max-width: 500px;
  display: grid;
  justify-items: center;
  grid-row-gap: 20px;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  h1 {
    font-size: 36px;
    line-height: 36px;
    color: #1a1a1a;
    font-style: normal;
    font-weight: normal;
  }
  span {
    font-size: 18px;
    line-height: 18px;
    color: #64c9e2;
    font-style: normal;
    font-weight: normal;
    a {
      color: #64c9e2;
      border-bottom: 1px solid #64c9e2;
    }
    fieldset {
      border: 0;
      padding: 0;
      &[disabled] {
        opacity: 0.5;
      }
      &::before {
        height: 10px;
        content: '';
        display: block;
      }
      &[aria-busy='true']::before {
        background-size: 50% auto;
        animation: ${loading} 0.5s linear infinite;
      }
    }
  }
  .guestParticipationBlock {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 2px solid #f2f2f2;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    color: #666666;
  }
`;

export const SignupButton = styled.div`
  display: grid;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  width: 300px;
  height: 56px;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0.05em;
  color: #1a1a1a;
  border: 2px solid #007c70;
  cursor: pointer;
  border-radius: 4px;
  background: none;
  padding: 1rem 3rem;
`;

export const CreateAccountForm = styled.form`
  text-align: initial;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-top: 2rem;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
  }
  input,
  textarea,
  select {
    font-family: Lato;
    margin-bottom: 1rem;
    height: 48px;
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
    font-family: Lato;
    margin-top: 3rem;
    margin-bottom: 3rem;
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
    border: 0;
    padding: 0;
    &[disabled] {
      opacity: 0.5;
    }
  }
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
  }
  span {
    font-size: 14px;
    line-height: 18px;
    color: #666666;
  }
  input[type='checkbox'] {
    width: auto;
  }
  .checkboxField {
    display: grid;
    grid-template-columns: 1fr 9fr;
  }
`;

export const InputBlock = styled.div`
  display: grid;
  text-align: left;
  grid-row-gap: 5px;
  input {
    height: 48px;
    padding: 12px;
    border: 1px solid #cccccc;
    box-sizing: border-box;
    border-radius: 4px;
  }
`;
