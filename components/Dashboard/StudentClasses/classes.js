import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import Link from 'next/link';

import styled from 'styled-components';
import ClassRow from './ClassList/index';
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
const MY_STUDENT_CLASSES_QUERY = gql`
  query MY_STUDENT_CLASSES_QUERY {
    myStudentClasses {
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

class Classes extends Component {
  render() {
    return (
      <StyledDasboard>
        <StyledClassesDasboard>
          <h1>My classes</h1>

          <Query query={MY_STUDENT_CLASSES_QUERY}>
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { myStudentClasses } = data;
              if (myStudentClasses.length === 0) {
                return (
                  <>
                    <h3>You haven’t joined any classes yet.</h3>
                    <p>Once you join a class, it will appear here.</p>
                    <div className="navigationHeader">
                      <Link
                        href={{
                          pathname: '/signup/student',
                        }}
                      >
                        <button>Join a class</button>
                      </Link>
                    </div>
                  </>
                );
              }
              return (
                <>
                  <div className="navigationHeader">
                    <Link
                      href={{
                        pathname: '/signup/student',
                      }}
                    >
                      <button>Join a class</button>
                    </Link>
                  </div>
                  <div>
                    <StyledClassHeader>
                      <div>Class name</div>
                      <div>Number of students</div>
                      <div>Date created</div>
                    </StyledClassHeader>

                    {myStudentClasses.map(myclass => (
                      <ClassRow
                        myclass={myclass}
                        key={myclass.id}
                        openClass={this.props.openClass}
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

export default Classes;
export { MY_STUDENT_CLASSES_QUERY };
