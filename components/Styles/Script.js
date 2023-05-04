import styled, { keyframes } from "styled-components";

const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;
const StyledStarboard = styled.div`
  margin: 3rem;
  font-size: 1.6rem;
  .upperPart {
    margin: 1rem;
    display: grid;
    grid-gap: 3rem;
    grid-template-columns: 1fr 4fr;
  }
  .header {
    display: grid;
    width: 100%;
    text-align: center;
    justify-items: center;
  }
  .scriptSelector {
    display: grid;
    width: 100%;
  }
  .savedScripts {
    display: grid;
    grid-gap: 2rem;
    margin: 1rem 0rem;
    padding: 2rem;
    border: 1px solid lightGrey;
    border-radius: 6px;
  }
  .savedScript {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 2fr 4fr 2fr 2fr 3fr;
    .settingInfo {
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .link {
    cursor: pointer;
    text-decoration: underline;
  }
  .checkboxField {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 14fr;
    align-items: center;
  }

  .visualizeScripts {
    display: grid;
    grid-gap: 1rem;
    margin: 1rem 0rem;
    padding: 1rem;
    border: 1px solid lightGrey;
    border-radius: 4px;
  }

  .visualizeScript {
    font-size: 14px;
    font-weight: normal;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 1fr 4fr 1fr 1fr;
  }

  .studyIdsInfo {
    display: grid;
    background: white;
    padding: 10px;
    grid-gap: 10px;
    .components {
      display: grid;
      grid-gap: 10px;
    }
    .componentHeader {
      display: grid;
      grid-gap: 5px;
      grid-template-columns: 1fr 1fr 1fr;
      font-weight: bold;
    }
    .componentRow {
      display: grid;
      grid-gap: 5px;
      grid-template-columns: 1fr 1fr 1fr;
    }
    .id {
      background: #ffc107;
      border: 1px solid lightGrey;
      border-radius: 5px;
      padding: 2px 10px;
    }
  }
`;

export const ScriptStyledForm = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  border: 5px solid white;
  border-radius: 10px;
  padding: 10px;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e6e6e6;
    padding: 10px;
    border-radius: 5px;
    &:focus {
      outline: 0;
      background: mintcream;
      border-color: ${(props) => props.theme.red};
    }
  }
  button,
  input[type="submit"] {
    width: 100%;
    background: #24b781;
    color: white;
    border: 0;
    border-radius: 5px;
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
      content: "";
      display: block;
      background-image: linear-gradient(
        to right,
        #208962 0%,
        #49e889 50%,
        #208962 100%
      );
    }
    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export const VisualizeStyledForm = styled.div`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  border: 5px solid white;
  border-radius: 10px;
  padding: 10px;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e6e6e6;
    padding: 10px;
    border-radius: 5px;
    &:focus {
      outline: 0;
      background: mintcream;
      border-color: ${(props) => props.theme.red};
    }
  }
  button,
  input[type="submit"] {
    width: 100%;
    background: #24b781;
    color: white;
    border: 0;
    border-radius: 5px;
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
      content: "";
      display: block;
      background-image: linear-gradient(
        to right,
        #208962 0%,
        #49e889 50%,
        #208962 100%
      );
    }
    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default StyledStarboard;
