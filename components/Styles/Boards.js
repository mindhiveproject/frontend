import styled from 'styled-components';

export const StyledBoard = styled.div`
  text-align: center;
  h1 {
    font-size: 36px;
    line-height: 36px;
    color: #1a1a1a;
    font-style: normal;
    font-weight: normal;
  }
`;

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

export const StyledLink = styled.span`
  border-bottom: 5px solid orange;
  cursor: pointer;
`;

export const NavigationButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 10px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 10px;
  button {
    width: 100%;
    height: 100%;
    font-size: 18px;
    line-height: 100%;
    letter-spacing: 0.05em;
    color: #007c70;
    border: 2px solid #007c70;
    cursor: pointer;
    border-radius: 4px;
    padding: 1rem 3rem;
    background: none;
  }
`;
