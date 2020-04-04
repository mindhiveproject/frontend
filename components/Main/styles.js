import styled from 'styled-components';

export const StyledButtons = styled.div`
  margin-top: 10px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  button {
    font-weight: 500;
    border: 1px solid grey;
    border-radius: 0;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 2rem;
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
