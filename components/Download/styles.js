import styled from 'styled-components';

export const StyledDownload = styled.div`
  display: grid;
  padding: 2rem;
  width: 100%;
  justify-items: center;
  align-content: baseline;
  .selector {
    display: grid;
    padding: 2rem;
  }
  .loadButtons {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
`;

export const StyledResult = styled.div`
  display: grid;
  padding: 1rem;
  border: 1px solid grey;
  cursor: pointer;
  background: ${props => (props.isSelected ? '#f7f7f7' : 'white')};
  color: ${props => (props.isSelected ? 'black' : 'lightgrey')};
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  border-radius: 7px;
`;
