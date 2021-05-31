import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import FetchStudentPage from '../../Classes/ClassPage/StudentPage/index';

// query to get all users
const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      username
      authEmail {
        email
      }
    }
  }
`;

const StyledHeader = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr 1fr;
  font-weight: bold;
`;

const StyledRow = styled.div`
  display: grid;
  padding: 10px;
  margin-bottom: 2px;
  grid-template-columns: 1fr 1fr;
  background: white;
`;

class OverviewUsers extends Component {
  state = {
    page: this.props.page || 'list',
    id: null,
  };

  openJournal = id => {
    this.setState({
      page: 'person',
      id,
    });
  };

  goBackToList = () => {
    this.setState({
      page: 'list',
      id: null,
    });
  };

  render() {
    const { page } = this.state;
    if (page === 'person') {
      return (
        <FetchStudentPage
          studentId={this.state.id}
          goBackToList={this.goBackToList}
        />
      );
    }

    return (
      <Query query={ALL_USERS_QUERY} variables={{ role: 'TEACHER' }}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const { users } = data;
          if (users.length === 0) {
            return <h3>There are no users</h3>;
          }
          return (
            <div>
              <StyledHeader>
                <div>Username</div>
                <div>Email address</div>
              </StyledHeader>

              {users.map((person, i) => {
                const email =
                  (person?.authEmail?.length && person?.authEmail[0].email) ||
                  '';
                return (
                  <StyledRow key={i}>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.openJournal(person.id)}
                    >
                      {person.username}
                    </div>
                    <div>{email}</div>
                  </StyledRow>
                );
              })}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default OverviewUsers;
