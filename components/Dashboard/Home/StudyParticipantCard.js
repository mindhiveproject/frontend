import React, { Component } from 'react';
import styled from 'styled-components';

const StyledStudyParticipantCard = styled.div`
  display: grid;
  background: white;
`;

class StudyParticipantCard extends Component {
  render() {
    const { study } = this.props;
    return (
      <StyledStudyParticipantCard>
        <h3>{study.title}</h3>
      </StyledStudyParticipantCard>
    );
  }
}

export default StudyParticipantCard;
