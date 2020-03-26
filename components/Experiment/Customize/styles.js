import styled from 'styled-components';

export const StyledParameterBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #eceaea;
  border-radius: 5px;
  padding: 10px;
  .help {
    font-size: 2rem;
    font-weight: 500;
  }
  .name {
    color: lightslategrey;
    font-weight: 400;
    justify-self: end;
  }
  .input {
    grid-column: 1/3;
  }
`;
