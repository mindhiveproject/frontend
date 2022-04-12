import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import moment from 'moment';
import debounce from 'lodash.debounce';
import ClassPage from '../../Classes/classpage';

import PaginationClasses from '../../../Pagination/allClasses';
import { StyledOverview } from '../../../Bank/Studies/overview';

// query to get all classes
const ALL_CLASSES_QUERY = gql`
  query ALL_CLASSES_QUERY($skip: Int, $first: Int, $search: String) {
    classes(
      skip: $skip
      first: $first
      where: { OR: [{ title_contains: $search }, { code_contains: $search }] }
    ) {
      id
      title
      creator {
        id
        username
      }
      students {
        id
      }
      mentors {
        id
        username
      }
      createdAt
    }
  }
`;

const StyledHeader = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(5, 1fr);
  font-weight: bold;
`;

const StyledRow = styled.div`
  display: grid;
  padding: 10px;
  margin-bottom: 2px;
  grid-template-columns: repeat(5, 1fr);
  background: white;
  cursor: pointer;
  /* font-size: 1.2rem; */
  span {
    /* padding: 0.2rem 0.5rem; */
    margin: 0rem 0.5rem 0rem 0rem;
    /* border-radius: 2rem; */
    /* border: 1px solid lightgrey; */
  }
`;

class OverviewClasses extends Component {
  state = {
    page: this.props.page || 'classes',
    classId: null,
    keyword: '',
    search: '',
  };

  openClass = classId => {
    this.setState({
      page: 'classpage',
      classId,
    });
  };

  goBack = () => {
    this.setState({
      page: 'classes',
      classId: null,
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
    const perPage = 10;
    const { page } = this.state;
    if (page === 'classpage') {
      return (
        <ClassPage
          classId={this.state.classId}
          goBack={this.goBack}
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
          query={ALL_CLASSES_QUERY}
          variables={{
            skip: this.props.pagination * perPage - perPage,
            first: perPage,
            search: this.state.search,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const { classes } = data;
            if (classes.length === 0) {
              return <h3>There are no classes</h3>;
            }
            return (
              <div>
                <StyledHeader>
                  <div>Class name</div>
                  <div>Number of students</div>
                  <div>Date created</div>
                  <div>Teacher</div>
                  <div>Mentors</div>
                </StyledHeader>

                {classes.map((theclass, i) => (
                  <StyledRow
                    key={i}
                    onClick={() => this.openClass(theclass.id)}
                  >
                    <div>{theclass.title}</div>
                    <div>{theclass.students.length} students</div>
                    <div>
                      {moment(theclass.createdAt).format('MMMM D, YYYY')}
                    </div>
                    <div>{theclass.creator.username}</div>
                    <div>
                      {theclass.mentors.map(mentor => (
                        <span>{mentor.username}</span>
                      ))}
                    </div>
                  </StyledRow>
                ))}
                <PaginationClasses
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

export default OverviewClasses;
