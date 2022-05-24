import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

import ReviewModal from './reviewModal';

const StyledStudiesHeader = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 300px 70px 70px 100px 200px auto;
  padding: 10px;
  font-weight: bold;
`;

const StyledClassRow = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 300px 70px 70px 100px 200px auto;
  background: white;
  grid-gap: 1rem;
  .title {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1rem;
    align-items: center;
  }
  margin: 1rem 0rem;
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

    const reviews = [
      ...student.reviews.map(review => ({
        id: review?.id,
        title: review?.study?.title,
        reviewedAt: review?.createdAt,
        slug: review?.study?.slug,
        stage: review?.stage,
        content: review?.content,
        proposalSlug: review?.proposal?.slug,
      })),
    ];

    if (reviews.length === 0) {
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
          <div>Review</div>
          <div>Study</div>
          <div>Proposal</div>
          <div>Review type</div>
          <div>Date reviewed</div>
        </StyledStudiesHeader>

        {reviews.map((review, id) => (
          <StyledClassRow key={id}>
            <div className="title">{review.title}</div>
            <div>
              <ReviewModal review={review} student={student} />
            </div>
            <div>
              <a
                href={`https://mindhive.science/studies/${review.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                Open
              </a>
            </div>
            <div>
              <a
                href={`https://mindhive.science/proposals/${review.proposalSlug}`}
                target="_blank"
                rel="noreferrer"
              >
                Open
              </a>
            </div>
            <div>{review?.stage}</div>
            <div>{moment(review.reviewedAt).format('MMMM D, YYYY, h:mma')}</div>
          </StyledClassRow>
        ))}
      </>
    );
  }
}

export default Reviewed;
