import React, { Component } from 'react';

import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

import styled from 'styled-components';
import JournalRow from '../../../Journal/JournalList/index';
import JournalPage from '../../../Journal/journalpage';

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
`;

const StyledJournalHeader = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  cursor: pointer;
  font-weight: bold;
`;

const EmptyRow = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr;
  background: white;
  grid-gap: 1rem;
  text-align: center;
  align-content: center;
  height: 100%;
`;

const JOURNALS_QUERY = gql`
  query JOURNALS_QUERY($id: ID!) {
    journals(where: { creator: { id: $id } }) {
      id
      title
      description
      creator {
        id
        username
      }
      createdAt
      posts {
        id
      }
    }
  }
`;

class StudentJournal extends Component {
  state = {
    page: this.props.page || 'journals',
    journal: null,
  };

  openJournal = journal => {
    this.setState({
      page: 'journalpage',
      journal,
    });
  };

  goBack = () => {
    this.setState({
      page: 'journals',
      journal: null,
    });
  };

  render() {
    const { page } = this.state;
    if (page === 'journals') {
      return (
        <>
          <Query
            query={JOURNALS_QUERY}
            variables={{ id: this.props.studentId }}
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { journals } = data;
              if (journals.length === 0) {
                return (
                  <EmptyRow>
                    <div>The student hasn’t created any journals yet.</div>
                  </EmptyRow>
                );
              }
              return (
                <>
                  <div>
                    <StyledRow>
                      <StyledJournalHeader>
                        <div>Journal name</div>
                        <div>Number of notes</div>
                        <div>Date created</div>
                      </StyledJournalHeader>
                      <div></div>
                    </StyledRow>

                    {journals.map(myjournal => (
                      <JournalRow
                        myjournal={myjournal}
                        key={myjournal.id}
                        openJournal={this.openJournal}
                        teacherMode
                      />
                    ))}
                  </div>
                </>
              );
            }}
          </Query>
        </>
      );
    }

    if (page === 'journalpage') {
      return (
        <JournalPage
          journal={this.state.journal}
          goBack={this.goBack}
          teacherMode
        />
      );
    }
  }
}

export default StudentJournal;
