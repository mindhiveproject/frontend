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

class Participated extends Component {
  render() {
    const { student } = this.props;

    const studies = [...student.participantIn];

    if (studies.length === 0) {
      return (
        <EmptyRow>
          <div>The student hasn’t participated in any studies yet.</div>
        </EmptyRow>
      );
    }

    return (
      <>
        <StyledStudiesHeader>
          <div>
            <span>Study title</span>
          </div>
          <div>Date participated</div>
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
            <div>In development 🚧🏗👷</div>
          </StyledClassRow>
        ))}
      </>
    );
  }
}

export default Participated;

// <div>{moment(study.createdAt).format('MMMM D, YYYY')}</div>
