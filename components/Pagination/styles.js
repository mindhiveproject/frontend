import styled from "styled-components";

export const StyledPagination = styled.div`
  display: grid;
  align-self: end;
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 1rem 0;
  border: 1px solid var(--lightGray);
  border-radius: 10px;
  background: white;
  padding: 0.5rem 1rem;
  width: 100%;
  & > * {
    align-content: center;
    display: grid;
    margin: 0;
    padding: 15px 10px;
    border-right: 1px solid var(--lightGray);
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled="true"] {
    color: lightgrey;
    pointer-events: none;
  }
  .next {
    text-align: end;
  }
  .inactive {
    text-decoration: none;
  }
  button {
    background: white;
    border: 0px white;
  }
`;
