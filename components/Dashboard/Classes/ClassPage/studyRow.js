import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";

const StyledStudiesRow = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  margin-bottom: 2px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  background: white;
`;

class StudyRow extends Component {
  render() {
    const { study } = this.props;
    const { isAdmin, isEducationalResearcher } = this.props;

    const authors = [
      study?.author?.username,
      ...study.collaborators.map((c) => c.username),
    ].join(", ");
    return (
      <StyledStudiesRow>
        <div>{study.title}</div>
        {!isEducationalResearcher && <div>{authors}</div>}
        <div>{study.participants.length}</div>
        <div>{moment(study.createdAt).format("MMMM D, YYYY")}</div>
        <div>
          <a target="_blank" href={`/studies/${study.slug}`} rel="noreferrer">
            Study page
          </a>
        </div>
        {!isEducationalResearcher && (
          <div>
            <a
              onClick={() => {
                this.props.openStudyBuilder(study?.id);
              }}
            >
              Study builder
            </a>
          </div>
        )}
      </StyledStudiesRow>
    );
  }
}

export default StudyRow;
