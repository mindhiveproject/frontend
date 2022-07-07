import styled from 'styled-components';

export const StyledTaskCard = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 10px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09), 0px 5px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  border-top: 14px solid;
  border-top-color: ${props =>
    props.taskType === 'TASK'
      ? '#64c9e2'
      : props.taskType === 'SURVEY'
      ? '#28619e'
      : '#ffc7c3'};
  margin-bottom: 10px;
  .movableCard {
    display: grid;
    width: 100%;
    height: 100%;
  }
  .icons {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    padding: 16px;
    .icon {
      display: grid;
      align-items: center;
      justify-items: center;
      background: #f3f5f6;
      width: 42px;
      height: 42px;
      border-radius: 20px;
      cursor: pointer;
    }
  }
`;
