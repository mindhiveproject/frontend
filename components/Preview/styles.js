import styled from 'styled-components';

export const PreviewContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

export const Preview = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 1%;
  right: 1%;
  width: 2.2em;
  line-height: 2em;
  text-align: center;
  cursor: pointer;
  border-radius: 2.25em;
  background-color: #4fbf1f;
  color: white;
  padding-bottom: 5px;
  font-size: 2em;
  :hover {
    background-color: #ea0707;
    transform: scale(1.1);
    transition: transform 0.5s;
  }
`;

export const StyledStudyPreviewPage = styled.div`
  display: grid;
  margin: 5rem 1rem;
`;
