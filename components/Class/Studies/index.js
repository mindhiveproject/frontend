import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import moment from 'moment';
import Error from '../../ErrorMessage/index';
import StudyLine from './line';

const StyledResults = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  width: 90%;
`;

const CLASS_STUDIES_QUERY = gql`
  query CLASS_STUDIES_QUERY($id: ID!) {
    classStudies(where: { id: $id }) {
      id
      title
      slug
      createdAt
      participants {
        id
      }
    }
  }
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

class ClassStudies extends Component {
  state = {
    randomizeStudiesOrder: false,
  };

  randomizeStudiesOrder = state => {
    this.setState({
      randomizeStudiesOrder: state,
    });
  };

  shuffleArray = array => {
    const newArray = [...array];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
  };

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
                {true && (
                  <>
                    <p>
                      This class is created by {schoolclass.creator.username}{' '}
                      {moment(schoolclass.createdAt).fromNow()}.
                    </p>
                  </>
                )}
                <p>{schoolclass.description}</p>
                <h2>Studies created by students</h2>
                <button onClick={() => this.randomizeStudiesOrder(true)}>
                  Randomize the order
                </button>
                <button onClick={() => this.randomizeStudiesOrder(false)}>
                  Order by name
                </button>
                <Query
                  query={CLASS_STUDIES_QUERY}
                  variables={{ id: this.props.id }}
                >
                  {({ error, loading, data }) => {
                    if (error) return <Error error={error} />;
                    if (loading) return <p>Loading</p>;
                    if (!data.classStudies) return <p>No studies found</p>;
                    const { classStudies } = data;
                    if (classStudies.length === 0) {
                      return (
                        <div>
                          <h1>No studies yet</h1>
                        </div>
                      );
                    }
                    let orderedStudies;
                    if (this.state.randomizeStudiesOrder) {
                      orderedStudies = this.shuffleArray(classStudies);
                    } else {
                      orderedStudies = classStudies.sort((a, b) =>
                        a.title.toLowerCase().trim() >
                        b.title.toLowerCase().trim()
                          ? 1
                          : b.title.toLowerCase().trim() >
                            a.title.toLowerCase().trim()
                          ? -1
                          : 0
                      );
                    }

                    return orderedStudies.map(study => (
                      <StudyLine key={study.id} study={study} />
                    ));
                  }}
                </Query>
              </div>
            );
          }}
        </Query>
      </StyledResults>
    );
  }
}

export default ClassStudies;
