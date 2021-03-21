import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Head from 'next/head';
import moment from 'moment';
import styled from 'styled-components';
import Error from '../../ErrorMessage/index';
import { ClassTable } from './styles';
import ExpelFromClass from '../Leave/expel';
import MoveToClass from '../Leave/move';

import { ContainerOnlyForTeachersOwners } from '../../Permissions/Teacher/index';

const StyledResults = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  width: 90%;
`;

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
      <StyledResults>
        <Query query={REVIEW_CLASS_QUERY} variables={{ id: this.props.id }}>
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading</p>;
            if (!data.class) return <p>No class found for {this.props.id}</p>;
            const schoolclass = data.class;
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

                <h2>Students of this class</h2>

                {schoolclass.students.map((student, i) => (
                  <ClassTable key={i}>
                    <h3>{student.username}</h3>

                    <ContainerOnlyForTeachersOwners
                      creator={schoolclass.creator.id}
                    >
                      <ExpelFromClass
                        classId={schoolclass.id}
                        studentId={student.id}
                      >
                        Expel from this class
                      </ExpelFromClass>
                      <MoveToClass studentId={student.id} />
                    </ContainerOnlyForTeachersOwners>
                  </ClassTable>
                ))}
              </div>
            );
          }}
        </Query>
      </StyledResults>
    );
  }
}

export default ReviewClass;
export { REVIEW_CLASS_QUERY };
