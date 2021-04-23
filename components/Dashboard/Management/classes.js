import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import moment from 'moment';

import styled from 'styled-components';
import { StyledDasboard, StyledClassesDasboard } from '../styles';

const StyledClassHeader = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  cursor: pointer;
  font-weight: bold;
`;

// write a query here, later refactor it in a separate file if it is used elsewhere
const All_CLASSES_QUERY = gql`
  query All_CLASSES_QUERY {
    classes {
      id
      title
      description
      creator {
        id
        username
      }
      createdAt
      students {
        id
      }
    }
  }
`;

class ClassesList extends Component {
  render() {
    return (
      <StyledDasboard>
        <StyledClassesDasboard>
          <Query query={All_CLASSES_QUERY}>
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { classes } = data;
              if (classes.length === 0) {
                return (
                  <>
                    <h3>There are no classes yet.</h3>
                  </>
                );
              }
              return (
                <>
                  <div className="navigationHeader"></div>
                  <div>
                    <StyledClassHeader>
                      <div>Class name</div>
                      <div>Teacher</div>
                      <div>Number of students</div>
                      <div>Date created</div>
                    </StyledClassHeader>

                    {classes.map(myclass => (
                      <ClassRow myclass={myclass} key={myclass.id} />
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

const StyledClassRow = styled.div`
  display: grid;
  margin: 5px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background: white;
  /* cursor: pointer; */
`;

class ClassRow extends Component {
  render() {
    const { myclass } = this.props;
    return (
      <div>
        <StyledClassRow>
          <div>{myclass?.title}</div>
          <div>{myclass?.creator?.username}</div>
          <div>{myclass?.students?.length}</div>
          <div>{moment(myclass?.createdAt).format('MMMM D, YYYY')}</div>
        </StyledClassRow>
      </div>
    );
  }
}

export default ClassesList;
export { All_CLASSES_QUERY };
