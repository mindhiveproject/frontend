import styled from 'styled-components';

export const PreviewContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const Preview = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem 1.5rem;
  width: 80%;
  height: 80%;
  border-radius: 0.3rem;
  overflow-y: auto;
  font-size: 1rem;
`;

export const CloseButton = styled.span`
  float: right;
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
