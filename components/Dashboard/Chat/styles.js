import styled from 'styled-components';

export const StyledGroupChat = styled.div`
  display: grid;
  grid-gap: 1px;
  margin: 0px 0px;
  .chatHeader {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 1rem;
    align-items: center;
    button {
      padding: 10px 24px 10px 24px;
      background: #007c70;
      border: 2px solid #007c70;
      box-sizing: border-box;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      font-family: 'Lato';
    }
  }
  .members {
    font-size: 1.2rem;
    display: grid;
    grid-gap: 1rem;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(50px, auto));
    justify-content: end;
    .member {
      display: grid;
      background: white;
      border: 2px solid #007c70;
      width: max-content;
      padding: 0.7rem;
      border-radius: 2rem;
      justify-content: center;
    }
  }
  .replyBtn {
    display: grid;
    width: 100%;
    justify-items: end;
    margin-bottom: 5px;
    button {
      padding: 5px 10px 5px 10px;
      background: #007c70;
      border: 1px solid #007c70;
      box-sizing: border-box;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      font-family: 'Lato';
    }
  }
  .header {
    display: grid;
    grid-gap: 10px;
    align-items: center;
    grid-template-columns: 1fr;
    padding: 5px 0px 0px 0px;
    .title {
      font-size: 20px;
    }
    .nameDate {
      font-size: 14px;
      display: grid
      grid-gap: 5px;
      grid-template-columns: 1fr auto;
      text-align: start;
      .date {
        color: grey;
      }
      .editLinks {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1px;
      }
    }
  }
`;

export const StyledMessage = styled.div`
  display: grid;
  background: white;
  margin: 15px 0px 0px 0px;
  padding: 0px 15px;
  .content {
    display: grid;
    margin: 1rem 0rem;
  }
  .comments {
    background: white;
    padding: 10px 0px 0px 0px;
  }
`;

export const StyledComment = styled.div`
  display: grid;
  background: white;
  padding: 0px 0px 0px 30px;
  border-top: 1px solid lightgrey;
  .content {
    display: grid;
    padding: 0px 0px 0px 0px;
    margin: 0px 0px 0px 0px;
  }
`;
