import styled from 'styled-components';

export const StyledOpening = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: baseline;
  background: #f6f9f8;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 60%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  overflow-y: auto;
  ${props => props.open && `transform: translateX(0);`};
  header {
  }
  button {
  }
`;

export const CloseButton = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  left: 0;
`;
