import styled from 'styled-components';

export const Center = styled.div`
  text-align: center;
`;

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

export const StyledCard = styled.div`
  margin: 5px;
  padding: 10px;
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 400;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  button {
    width: 100%;
    margin-bottom: 5px;
    margin: 6px;
    min-height: 56px;
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
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;
