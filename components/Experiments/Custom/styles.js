import styled from 'styled-components';

export const Center = styled.div`
  text-align: center;
`;

export const ExperimentsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
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
    height: 100px;
  }
`;
