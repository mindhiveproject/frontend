import styled from 'styled-components';

export const StyledExperiment = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 5%;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: row;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

export const StyledButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  justify-items: center;
  align-self: end;
  button {
    width: 200px;
    background: #fdfffc;
    border-radius: 5px;
    cursor: pointer;
  }
  button:disabled,
  button[disabled] {
    background-color: #dbdbdb;
  }
`;

export const StyledLink = styled.span`
  border-bottom: 5px solid orange;
  cursor: pointer;
`;

export const StyledCustomExperiments = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 5%;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: row;
  grid-row-gap: 10px;
`;

export const StyledCustomExperimentLine = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-column-gap: 20px;
  border: 1px solid #b9c1b9;
  padding: 10px;
  align-items: center;
  border-radius: 5px;
  button {
    background: white;
    cursor: pointer;
    border-radius: 5px;
    height: 50px;
  }
`;
