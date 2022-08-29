import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/client/react/components';
import moment from 'moment';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import FetchStudentPage from '../../Classes/ClassPage/StudentPage/index';

import PaginationUsers from '../../../Pagination/allUsers';
import { StyledOverview } from '../../../Bank/Studies/overview';

// query to get all users
const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY($skip: Int, $first: Int, $search: String) {
    users(
      skip: $skip
      first: $first
      where: {
        OR: [
          { username_contains: $search }
          { publicReadableId_contains: $search }
        ]
      }
    ) {
      id
      publicReadableId
      publicId
      username
      authEmail {
        email
      }
      permissions
      createdAt
    }
  }
`;

const StyledHeader = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  font-weight: bold;
`;

const StyledRow = styled.div`
  display: grid;
  padding: 10px;
  margin-bottom: 2px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background: white;
`;

class OverviewUsers extends Component {
  state = {
    page: this.props.page || 'list',
    id: null,
    keyword: '',
    search: '',
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

  debouncedSearch = debounce(value => {
    this.setState({
      search: value,
    });
  }, 1000);

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.debouncedSearch(e.target.value);
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
      <StyledOverview>
        <div className="searchArea">
          <span>Search</span>
          <input
            type="text"
            name="keyword"
            value={this.state.keyword}
            onChange={this.saveToState}
          />
        </div>
        <Query
          query={ALL_USERS_QUERY}
          variables={{
            skip: this.props.pagination * perPage - perPage,
            first: perPage,
            search: this.state.search,
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
                <StyledHeader>
                  <div>Readable ID</div>
                  <div>Username</div>
                  <div>Email</div>
                  <div>Role</div>
                  <div>Created at</div>
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
                        {person?.authEmail?.length &&
                          person?.authEmail[0]?.email}
                      </div>
                      <div>
                        {person?.permissions.map(permission => (
                          <span>{permission} </span>
                        ))}
                      </div>
                      <div>
                        {moment(person?.createdAt).format(
                          'MMMM D, YY, h:mm:ss'
                        )}
                      </div>
                    </StyledRow>
                  );
                })}

                <PaginationUsers
                  pagination={this.props.pagination}
                  perPage={perPage}
                  search={this.state.search}
                />
              </div>
            );
          }}
        </Query>
      </StyledOverview>
    );
  }
}

export default OverviewUsers;
