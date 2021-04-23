import styled from 'styled-components';

export const PreviewContainer = styled.div`
  position: relative;
  height: 90vh;
`;

export const Preview = styled.div`
  display: grid;
  justify-items: center;
  background: white;
  height: 100%;
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 1%;
  right: 1%;
  width: 3.3rem;
  line-height: 3rem;
  text-align: center;
  cursor: pointer;
  border-radius: 2.25rem;
  background-color: #4fbf1f;
  color: white;
  padding-bottom: 5px;
  font-size: 2rem;
  :hover {
    background-color: #ea0707;
    transform: scale(1.1);
    transition: transform 0.5s;
  }
`;
