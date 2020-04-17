import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;

export const StyledParameterForm = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  // background: rgba(0, 0, 0, 0.01);
  border: 5px solid white;
  border-radius: 10px;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 2rem;
    border: 1px solid #e6e6e6;
    padding: 10px;
    border-radius: 5px;
    &:focus {
      outline: 0;
      background: mintcream;
      border-color: ${props => props.theme.red};
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: #24b781;
    color: white;
    border: 0;
    border-radius: 5px;
    font-size: 2rem;
    font-weight: 600;
    padding: 1rem 1.2rem;
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
      background-image: linear-gradient(
        to right,
        #208962 0%,
        #49e889 50%,
        #208962 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export const StyledParameterBlock = styled.div`
  background: #fbfbfb;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin-top: 25px;
  margin-bottom: 25px;
  border: 1px solid #eceaea;
  border-radius: 5px;
  padding: 20px;
  .help {
    font-size: 2rem;
    font-weight: 500;
  }
  .example {
    color: #554e4e;
    font-weight: 400;
  }
  .name {
    color: lightslategrey;
    font-weight: 400;
    justify-self: end;
  }
  .input {
    /* grid-column: 1/3; */
  }
  textarea {
    height: 500px;
  }
`;

export const ControlButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  grid-gap: 20px;
  padding-top: 10px;
  button {
    cursor: pointer;
  }
`;

export const StyledStatementLine = styled.div`
  display: grid;
  grid-template-columns: 9fr 1fr;
  button {
    cursor: pointer;
    width: 4.3rem;
    text-align: center;
    border-radius: 2.25rem;
    background-color: #4fbf1f;
    color: white;
    font-size: 2rem;
    :hover {
      background-color: #ea0707;
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
`;

export const StyledOptionLine = styled.div`
  width: auto;
  background: white;
  color: grey;
  border: 0;
  border-radius: 5px;
  font-size: 2rem;
  font-weight: 600;
  padding: 1rem 1.2rem;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid lightslategrey;
  &.selected {
    background: #24b781;
    color: white;
  }
`;
