import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const StyledStudiesHeader = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr auto;
  padding: 10px;
  font-weight: bold;
  grid-gap: 1rem;
`;

const StyledClassRow = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr auto;
  background: white;
  grid-gap: 1rem;
  .title {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1rem;
    align-items: center;
  }
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
        id: review?.id,
        title: review?.study?.title,
        reviewedAt: review?.createdAt,
        slug: review?.study?.slug,
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
            <div className="title">
              {study.title}
              <a
                href={`https://mindhive.science/studies/${study.slug}`}
                target="_blank"
              >
                <Icon name="external alternate" />
              </a>
            </div>
            <div>{moment(study.reviewedAt).format('MMMM D, YYYY, h:mma')}</div>
          </StyledClassRow>
        ))}
      </>
    );
  }
}

export default Reviewed;
