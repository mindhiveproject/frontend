import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ClassRow from './ClassList/index';

import { StyledDasboard, StyledClassesDasboard } from '../styles';

// write a query here, later refactor it in a separate file if it is used elsewhere
const MY_CLASSES_QUERY = gql`
  query MY_CLASSES_QUERY {
    myClasses {
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

          <Query query={MY_CLASSES_QUERY}>
            {({ data, error, loading }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error: {error.message}</p>;
              const { myClasses } = data;
              if (myClasses.length === 0) {
                return (
                  <>
                    <h3>You haven’t created any classes yet.</h3>
                    <p>Once you create a class, it will appear here.</p>
                    <div>
                      <button onClick={this.props.addClass}>Add class</button>
                    </div>
                  </>
                );
              }
              return (
                <>
                  <div className="navigationHeader">
                    <div>
                      <p>Show archived</p>
                    </div>
                    <div>
                      <button onClick={this.props.addClass}>Add class</button>
                    </div>
                  </div>
                  <div>
                    {myClasses.map(myclass => (
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
