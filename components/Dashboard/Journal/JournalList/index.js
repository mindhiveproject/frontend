import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import DeleteJournal from './deleteJournal';

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
`;

const StyledClassRow = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background: white;
  cursor: pointer;
`;

class JournalRow extends Component {
  render() {
    const { myjournal } = this.props;
    return (
      <StyledRow>
        <StyledClassRow onClick={() => this.props.openJournal(myjournal)}>
          <div>{myjournal.title}</div>
          <div>{myjournal.posts.length}</div>
          <div>{moment(myjournal.createdAt).format('MMMM D, YYYY')}</div>
        </StyledClassRow>
        <div className="deleteBtn">
          <DeleteJournal journalId={myjournal.id}>Delete</DeleteJournal>
        </div>
      </StyledRow>
    );
  }
}

export default JournalRow;
export { StyledClassRow };
