import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import styled from 'styled-components';

import StudyRow from './studyRow';

const StyledStudiesTop = styled.div`
  display: grid;
  margin-bottom: 20px;
  padding: 20px;
  grid-template-columns: auto 1fr;
  button {
    display: grid;
    align-content: center;
    max-width: 300px;
    width: 100%;
    background: none;
    color: #007c70;
    padding: 12px 15px;
    border: 2px solid #007c70;
    border-radius: 4px;
    cursor: pointer;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.05em;
    text-align: center;
  }
`;

const StyledStudiesHeader = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr;
  font-weight: bold;
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
      author {
        username
      }
      collaborators {
        username
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
      <div>
        <StyledStudiesTop>
          <button onClick={() => this.randomizeStudiesOrder(true)}>
            Randomize Order
          </button>
          <div></div>
        </StyledStudiesTop>

        <StyledStudiesHeader>
          <div>
            <span>Study title </span>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => this.randomizeStudiesOrder(false)}
            >
              {' '}
              ↓
            </span>
          </div>
          <div>Collaborator(s)</div>
          <div>Participants</div>
          <div>Date created</div>
          <div></div>
        </StyledStudiesHeader>

        <Query
          query={CLASS_STUDIES_QUERY}
          variables={{ id: this.props.schoolclass.id }}
        >
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading</p>;
            if (!data.classStudies) return <p>No studies found</p>;
            const { classStudies } = data;
            if (classStudies.length === 0) {
              return (
                <div>
                  <p>No studies yet</p>
                </div>
              );
            }

            let orderedStudies;
            if (this.state.randomizeStudiesOrder) {
              orderedStudies = this.shuffleArray(classStudies);
            } else {
              orderedStudies = [...classStudies].sort((a, b) =>
                a.title.toLowerCase().trim() > b.title.toLowerCase().trim()
                  ? 1
                  : b.title.toLowerCase().trim() > a.title.toLowerCase().trim()
                  ? -1
                  : 0
              );
            }

            return orderedStudies.map(study => (
              <StudyRow
                key={study.id}
                study={study}
                openStudyBuilder={this.props.openStudyBuilder}
              />
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default ClassStudies;
