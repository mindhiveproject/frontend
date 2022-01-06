import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import moment from 'moment';
import ClassPage from '../../Classes/classpage';

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

  render() {
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
                <div>Class name</div>
                <div>Number of students</div>
                <div>Date created</div>
                <div>Teacher</div>
                <div>Mentors</div>
              </StyledHeader>

              {classes.map((theclass, i) => (
                <StyledRow key={i} onClick={() => this.openClass(theclass.id)}>
                  <div>{theclass.title}</div>
                  <div>{theclass.students.length} students</div>
                  <div>{moment(theclass.createdAt).format('MMMM D, YYYY')}</div>
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

export default OverviewClasses;
