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

const STUDENT_HOMEWORKS_QUERY = gql`
  query STUDENT_HOMEWORKS_QUERY($studentId: ID!) {
    homework(where: { author: { id: $studentId } }) {
      id
      title
      content
      settings
      public
      author {
        username
      }
      createdAt
    }
  }
`;

class StudentHomework extends Component {
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
            query={STUDENT_HOMEWORKS_QUERY}
            variables={{ id: this.props.studentId }}
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { journals } = data;
              if (journals.length === 0) {
                return (
                  <EmptyRow>
                    <div>The student hasn’t written any homework yet.</div>
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

export default StudentHomework;
