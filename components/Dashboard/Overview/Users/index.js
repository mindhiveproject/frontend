import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import FetchStudentPage from '../../Classes/ClassPage/StudentPage/index';

import PaginationUsers from '../../../Pagination/allUsers';

// query to get all users
const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY($skip: Int, $first: Int) {
    users(skip: $skip, first: $first) {
      id
      publicReadableId
      publicId
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
  grid-template-columns: 1fr 1fr 1fr;
  font-weight: bold;
`;

const StyledRow = styled.div`
  display: grid;
  padding: 10px;
  margin-bottom: 2px;
  grid-template-columns: 1fr 1fr 1fr;
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
    const perPage = 30;
    const { page } = this.state;
    if (page === 'person') {
      return (
        <FetchStudentPage
          studentId={this.state.id}
          goBackToList={this.goBackToList}
          adminMode
        />
      );
    }

    return (
      <Query
        query={ALL_USERS_QUERY}
        variables={{
          skip: this.props.pagination * perPage - perPage,
          first: perPage,
        }}
      >
        {({ data, error, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const { users } = data;
          if (users.length === 0) {
            return <h3>There are no users</h3>;
          }
          return (
            <div>
              <PaginationUsers
                pagination={this.props.pagination}
                perPage={perPage}
              />
              <StyledHeader>
                <div>Readable ID</div>
                <div>Username</div>
                <div>Email</div>
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
                      {person.publicReadableId ||
                        person.publicId ||
                        person.id ||
                        'John Doe'}
                    </div>
                    <div>{person?.username}</div>
                    <div>
                      {person?.authEmail?.length && person?.authEmail[0]?.email}
                    </div>
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
