import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const StyledStudiesHeader = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr auto;
  padding: 10px;
  font-weight: bold;
`;

const StyledClassRow = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr auto;
  background: white;
`;

const EmptyRow = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr;
  background: white;
  grid-gap: 1rem;
  text-align: center;
  align-content: center;
  height: 100%;
`;

class Reviewed extends Component {
  render() {
    const { student } = this.props;

    const reviewedStudies = [
      ...student.reviews.map(review => ({
        title: review?.study?.title,
        reviewedAt: review?.createdAt,
      })),
    ];

    if (reviewedStudies.length === 0) {
      return (
        <EmptyRow>
          <div>The student hasn’t reviewed any studies yet.</div>
        </EmptyRow>
      );
    }

    return (
      <>
        <StyledStudiesHeader>
          <div>Study title</div>
          <div>Date reviewed</div>
        </StyledStudiesHeader>

        {reviewedStudies.map((study, id) => (
          <StyledClassRow key={id}>
            <div>{study.title}</div>
            <div>In development 🚧🏗👷</div>
          </StyledClassRow>
        ))}
      </>
    );
  }
}

// <div>{moment(study.reviewedAt).format('MMMM D, YYYY, h:mma')}</div>

export default Reviewed;
