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
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  grid-column-gap: 10px;
  border: 1px solid #d6e3d6;
  padding: 5px 10px 5px 10px;
  align-items: center;
  border-radius: 5px;
  button {
    font-weight: 300;
    border: 1px solid grey;
    border-radius: 0;
    cursor: pointer;
    text-transform: uppercase;
    padding: 0.8rem 1.5rem;
    transform: skew(-2deg);
    display: inline-block;
    transition: all 0.5s;
    &[disabled] {
      opacity: 0.5;
    }
  }
  button: hover {
    background: rgb(246, 110, 94);
    a {
      color: white;
    }
  }
`;
