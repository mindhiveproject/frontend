import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import styled from 'styled-components';
import JournalRow from './JournalList/index';
import { StyledDasboard, StyledClassesDasboard } from '../styles';

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

// write a query here, later refactor it in a separate file if it is used elsewhere
const MY_JOURNALS_QUERY = gql`
  query MY_JOURNALS_QUERY {
    myJournals {
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

class Journals extends Component {
  render() {
    return (
      <StyledDasboard>
        <StyledClassesDasboard>
          <h1>My journals</h1>

          <Query query={MY_JOURNALS_QUERY}>
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { myJournals } = data;
              if (myJournals.length === 0) {
                return (
                  <>
                    <h3>You haven’t created any journals yet.</h3>
                    <p>Once you create a journal, it will appear here.</p>
                    <div className="navigationHeader">
                      <div></div>
                      <div>
                        <button onClick={this.props.addJournal}>
                          Add journal
                        </button>
                      </div>
                    </div>
                    <div>
                      <p>
                        Use the journal to document any MindHive related
                        thoughts or notes, including but not limited to:
                      </p>
                      <ul>
                        <li>
                          Follow-up ideas or reflections on MindHive studies
                        </li>
                        <li>
                          Something you read that you might want to use later
                        </li>
                        <li>A research idea that came to you in the shower</li>
                        <li>
                          Something that was discussed in class that you don't
                          want to forget
                        </li>
                      </ul>
                    </div>
                  </>
                );
              }
              return (
                <>
                  <div className="navigationHeader">
                    <div></div>
                    <div>
                      <button onClick={this.props.addJournal}>
                        Add journal
                      </button>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>
                        Use the journal to document any MindHive related
                        thoughts or notes, including but not limited to:
                      </p>
                      <ul>
                        <li>
                          Follow-up ideas or reflections on MindHive studies
                        </li>
                        <li>
                          Something you read that you might want to use later
                        </li>
                        <li>A research idea that came to you in the shower</li>
                        <li>
                          Something that was discussed in class that you don't
                          want to forget
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <StyledRow>
                      <StyledJournalHeader>
                        <div>Journal name</div>
                        <div>Number of notes</div>
                        <div>Date created</div>
                      </StyledJournalHeader>
                      <div></div>
                    </StyledRow>

                    {myJournals.map(myjournal => (
                      <JournalRow
                        myjournal={myjournal}
                        key={myjournal.id}
                        openJournal={this.props.openJournal}
                      />
                    ))}
                  </div>
                </>
              );
            }}
          </Query>
        </StyledClassesDasboard>
      </StyledDasboard>
    );
  }
}

export default Journals;
export { MY_JOURNALS_QUERY };
