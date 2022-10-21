import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/client/react/components';
import moment from 'moment';
import debounce from 'lodash.debounce';

import FetchUserPage from '../../Classes/ClassPage/StudentPage/index';
import PaginationUsers from '../../../Pagination/allUsers';

import { StyledOverview } from '../../../Bank/Studies/overview';

import { ALL_USERS_QUERY } from '../../../Queries/User';

const StyledHeader = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  font-weight: bold;
`;

const StyledRow = styled.div`
  display: grid;
  padding: 10px;
  margin-bottom: 5px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background: white;
  box-shadow: 0px 2px 4px 0px #00000026;
  transition: box-shadow 300ms ease-out;
  :hover {
    box-shadow: 0px 2px 24px 0px #0000001a;
  }
`;

class OverviewUsers extends Component {
  state = {
    pagination: this.props.pagination || 1,
    page: this.props.page || 'list',
    userId: null,
    keyword: '',
    search: '',
  };

  openUserInformation = userId => {
    this.setState({
      page: 'user',
      userId,
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

  goToPage = page => {
    if (page > 0) {
      this.setState({
        pagination: page,
      });
    }
  };

  render() {
    const perPage = 30;
    const { page, userId } = this.state;
    if (page === 'user') {
      return (
        <FetchUserPage
          studentId={userId}
          goBackToList={this.goBackToList}
          adminMode
        />
      );
    }

    return (
      <StyledOverview>
        <div className="topRow">
          <div className="searchArea">
            <span>Search</span>
            <input
              type="text"
              name="keyword"
              value={this.state.keyword}
              onChange={this.saveToState}
            />
          </div>
          <div className="searchArea">
            <span>Page</span>
            <input
              type="number"
              name="pagination"
              value={this.state.pagination}
              min={1}
              onChange={e => {
                const { value } = e?.target;
                this.goToPage(value);
              }}
            />
          </div>
        </div>
        <Query
          query={ALL_USERS_QUERY}
          variables={{
            skip: this.state.pagination * perPage - perPage,
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
                  <div>Date created</div>
                </StyledHeader>

                {users.map((person, i) => {
                  const email =
                    (person?.authEmail?.length && person?.authEmail[0].email) ||
                    '';
                  return (
                    <StyledRow
                      key={i}
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.openUserInformation(person.id)}
                    >
                      <div>
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
                  pagination={this.state.pagination}
                  perPage={perPage}
                  search={this.state.search}
                  goToPage={this.goToPage}
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
