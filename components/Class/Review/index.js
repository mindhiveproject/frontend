import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import moment from 'moment';
import Error from '../../ErrorMessage/index';
import { ClassTable } from './styles';

const REVIEW_CLASS_QUERY = gql`
  query REVIEW_CLASS_QUERY($id: ID!) {
    class(where: { id: $id }) {
      id
      title
      code
      description
      creator {
        id
        username
      }
      createdAt
      students {
        id
        username
        image
      }
    }
  }
`;

class ReviewClass extends Component {
  render() {
    return (
      <Query query={REVIEW_CLASS_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.class) return <p>No class found for {this.props.id}</p>;
          const schoolclass = data.class;
          console.log('schoolclass', schoolclass);
          return (
            <div>
              <Head>
                <title>mindHIVE | {schoolclass.title}</title>
              </Head>
              <h2>{schoolclass.title}</h2>
              <h1>The class code {schoolclass.code}</h1>
              {true && (
                <>
                  <p>
                    This class is created by {schoolclass.creator.username}{' '}
                    {moment(schoolclass.createdAt).fromNow()}.
                  </p>
                </>
              )}
              <p>{schoolclass.description}</p>

              <h3>Students of this class</h3>
              <ul>
                {schoolclass.students.map((student, i) => (
                  <ClassTable key={i}>
                    <h3>{student.username}</h3>
                    <img src={student.image} height="100px" />
                  </ClassTable>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ReviewClass;
export { REVIEW_CLASS_QUERY };
