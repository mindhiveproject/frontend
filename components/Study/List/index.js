import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
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

const ALL_STUDIES_QUERY = gql`
  query ALL_STUDIES_QUERY {
    allStudies {
      id
      title
      slug
      createdAt
      participants {
        id
      }
      author {
        username
      }
      collaborators {
        username
      }
    }
  }
`;

class AllStudies extends Component {
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
        <Query query={ALL_STUDIES_QUERY}>
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading</p>;
            console.log('data', data);
            if (!data.allStudies) return <p>No studies found</p>;

            const { allStudies } = data;
            if (allStudies.length === 0) {
              return (
                <div>
                  <h1>No studies yet</h1>
                </div>
              );
            }
            let orderedStudies;
            if (this.state.randomizeStudiesOrder) {
              orderedStudies = this.shuffleArray(allStudies);
            } else {
              orderedStudies = allStudies.sort((a, b) =>
                a.title.toLowerCase().trim() > b.title.toLowerCase().trim()
                  ? 1
                  : b.title.toLowerCase().trim() > a.title.toLowerCase().trim()
                  ? -1
                  : 0
              );
            }

            return orderedStudies.map(study => (
              <StudyLine key={study.id} study={study} />
            ));
          }}
        </Query>
      </StyledResults>
    );
  }
}

export default AllStudies;
