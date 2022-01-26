import styled from 'styled-components';

export const OnboardingModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background: white;
  overflow: auto;
`;

export const OnboardingForm = styled.div`
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 20px;
  h1 {
    font-family: Lato;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: 56px;
    letter-spacing: 0em;

    color: #1a1a1a;
  }
  h2 {
    font-family: Lato;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.05em;

    color: #1a1a1a;
  }
  h3 {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
  }
  p {
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.05em;
  }
  input {
    max-width: 500px;
    font-family: Lato;
    margin-bottom: 1rem;
    height: 48px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    font-size: 16px;
    line-height: 24px;
    padding: 12px;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.red};
    }
  }
  button {
    font-family: Lato;
    margin-top: 3rem;
    margin-bottom: 3rem;
    width: 100%;
    background: white;
    color: #007c70;
    /* padding: 1rem 0.5rem; */
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    /* line-height: 100%; */
    border: 2px solid #007c70;
    border-radius: 4px;
    cursor: pointer;
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
    input {
      margin-bottom: 0rem;
      width: 40%;
      color: #666666;
    }
  }
  .buttonsHolder {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
  }
  .emailInput {
    width: 300px;
  }
  .questionTitle {
    font-size: 20px;
    margin-top: 20px;
  }
`;

export const OnboardingHeader = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 12fr 1fr;
  align-items: start;
  padding-bottom: 20px;
  margin-bottom: 40px;
  border-bottom: 2px solid #f2f2f2;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0.05em;
  color: #28619e;
  .logo {
    display: grid;
    margin: 0 0;
  }
  .closeBtn {
    color: #5f6871;
    cursor: pointer;
    text-align: end;
    font-size: 40px;
  }
`;

export const StyledWaySelector = styled.div`
  display: grid;
  .header {
    margin: 3rem 0rem;
    text-align: center;
  }
  .options {
    margin: 2rem 0rem;
    display: grid;
    grid-gap: 0rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    text-align: center;
    .option {
      display: grid;
      grid-template-rows: 1fr 1fr auto;
      grid-gap: 1rem;
      justify-items: center;
      padding: 1rem 3rem;
    }
    .middle {
      border-left: 2px solid #f2f2f2;
      border-right: 2px solid #f2f2f2;
    }
    .right {
      border-left: 2px solid #f2f2f2;
    }
    button {
      width: 211px;
      height: 56px;
    }
  }
`;

export const OnboardingDetails = styled.div`
  display: grid;
  max-width: 800px;
  margin: 0 auto;
  button {
    max-width: 211px;
    padding: 1rem 0.5rem;
  }
`;
