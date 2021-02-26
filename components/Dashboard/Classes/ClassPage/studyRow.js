import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Link from 'next/link';

const StyledStudiesRow = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  margin-bottom: 2px;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
  background: white;
`;

class StudyRow extends Component {
  render() {
    const { study } = this.props;
    const authors = [
      study?.author?.username,
      ...study.collaborators.map(c => c.username),
    ].join(', ');
    return (
      <StyledStudiesRow>
        <div>{study.title}</div>
        <div>{authors}</div>
        <div>{study.participants.length}</div>
        <div>{moment(study.createdAt).format('MMMM D, YYYY')}</div>
        <div>
          <Link href="/studies/[slug]" as={`/studies/${study.slug}`}>
            <a>Go to study</a>
          </Link>
        </div>
      </StyledStudiesRow>
    );
  }
}

export default StudyRow;
