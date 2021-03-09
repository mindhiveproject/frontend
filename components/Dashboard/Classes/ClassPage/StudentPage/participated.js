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

class Participated extends Component {
  render() {
    const { student } = this.props;
    return (
      <>
        <StyledStudiesHeader>
          <div>
            <span>Study title </span>
          </div>
          <div>Date participated</div>
        </StyledStudiesHeader>

        {student.participantIn.map(study => (
          <StyledClassRow>
            <div>{study.title}</div>
            <div>In development 🚧🏗👷</div>
          </StyledClassRow>
        ))}
      </>
    );
  }
}

export default Participated;

// <div>{moment(study.createdAt).format('MMMM D, YYYY')}</div>
