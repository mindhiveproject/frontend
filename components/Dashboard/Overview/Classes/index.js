import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import FetchStudentPage from '../../Classes/ClassPage/StudentPage/index';

// query to get all users
const ALL_CLASSES_QUERY = gql`
  query ALL_CLASSES_QUERY {
    classes {
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
    }
  }
`;

const StyledHeader = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  font-weight: bold;
`;

const StyledRow = styled.div`
  display: grid;
  padding: 10px;
  margin-bottom: 2px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background: white;
  span {
    padding: 0.2rem 0.5rem;
    margin: 0rem 0.2rem;
    border-radius: 2rem;
    border: 1px solid lightgrey;
  }
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
          adminMode
        />
      );
    }

    return (
      <Query query={ALL_CLASSES_QUERY} variables={{ role: 'TEACHER' }}>
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
                <div>Class ID</div>
                <div>Students</div>
                <div>Teacher</div>
                <div>Mentors</div>
              </StyledHeader>

              {classes.map((theclass, i) => (
                <StyledRow key={i}>
                  <div>{theclass.title}</div>
                  <div>{theclass.students.length} students</div>
                  <div>{theclass.creator.username}</div>
                  <div>
                    {theclass.mentors.map(mentor => (
                      <span>{mentor.username}</span>
                    ))}
                  </div>
                </StyledRow>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default OverviewUsers;
