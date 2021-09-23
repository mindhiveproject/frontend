import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';

const StyledStudiesHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 250px;
  padding: 10px;
  font-weight: bold;
  grid-gap: 1rem;
`;

const StyledClassRow = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 3fr 1fr 250px;
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

class Created extends Component {
  render() {
    const { student } = this.props;

    const studies = [
      ...student.researcherIn.map(study => ({
        ...study,
        role: 'Author',
      })),
      ...student.collaboratorInStudy.map(study => ({
        ...study,
        role: 'Collaborator',
      })),
    ];

    if (studies.length === 0) {
      return (
        <EmptyRow>
          <div>The student hasn’t created any studies yet.</div>
        </EmptyRow>
      );
    }

    return (
      <>
        <StyledStudiesHeader>
          <div>Study title</div>
          <div>Role</div>
          <div>Date created</div>
        </StyledStudiesHeader>

        {studies.map((study, id) => (
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
            <div>{study.role}</div>
            <div>{moment(study.createdAt).format('MMMM D, YYYY, h:mma')}</div>
          </StyledClassRow>
        ))}
      </>
    );
  }
}

export default Created;
