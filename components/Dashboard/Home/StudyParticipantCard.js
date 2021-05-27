import React, { Component } from 'react';
import styled from 'styled-components';

const StyledStudyCard = styled.div`
  display: grid;
  background: white;
`;

class StudyCard extends Component {
  render() {
    const { study } = this.props;
    return (
      <StyledStudyCard>
        <h3>{study.title}</h3>
      </StyledStudyCard>
    );
  }
}

export default StudyCard;
