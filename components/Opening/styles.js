import styled from 'styled-components';

export const StyledOpening = styled.div`
  display: grid;

  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 60%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;

  z-index: 5;
  overflow-y: auto;
  ${props => props.open && `transform: translateX(0);`};
  header {
  }
  button {
  }

  .inner {
    display: grid;
    grid-template-rows: auto 1fr;
    align-items: baseline;
    background: #f6f9f8;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
    height: 100%;
    margin: 0px 0px 0px 40px;
    padding: 10px;
  }
`;

export const CloseButton = styled.button`
  background: #f6f9f8;
  color: #007c70;
  font-size: 4rem;
  font-weight: bold;
  padding: 0px 10px;
  border: 0;
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  cursor: pointer;
  border-radius: 5px;
`;
