import styled from 'styled-components';

export const StyledProposal = styled.div`
  display: grid;
  width: 100%;
  overflow-y: scroll;

  button {
    display: grid;
    align-content: center;
    max-width: 300px;
    width: 100%;
    background: none;
    color: #666666;
    padding: 15px 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    cursor: pointer;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.05em;
    text-align: center;
  }
`;

export const StyledEmptyProposalOverview = styled.div`
  display: grid;
  grid-gap: 1rem;
  align-content: center;
  justify-content: center;
  text-align: center;
  height: 70vh;
`;

export const StyledProposalOverview = styled.div`
  display: grid;
  grid-gap: 1rem;
  margin: 3rem;
  align-content: baseline;
  .navigationHeader {
    display: grid;
    justify-content: end;
  }
`;

export const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
  align-items: center;
`;

export const StyledProposalHeader = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  cursor: pointer;
  font-weight: bold;
`;

export const StyledItemRow = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background: white;
  align-items: center;
  .actionLinks {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
  }
`;

export const StyledDropdown = styled.div`
  width: 100%;
  height: 50px;
`;
