import styled from 'styled-components';

export const StyledDevelopWrapper = styled.div`
  display: grid;
`;

export const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: 5fr 3fr;
  border: 1px solid grey;
  padding: 10px;
  height: 90vh;
`;

export const StyledSettings = styled.div`
  display: grid;
  align-content: baseline;
  grid-gap: 18px;
  background: #f4f5f5;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.07);
  padding: 30px;
  .card {
    padding: 20px 30px;
    background: #ffffff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
  }
`;
