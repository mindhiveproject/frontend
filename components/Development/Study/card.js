import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';

// import { StyledStudyCard } from '../../Bank/styles';

const StyledStudyCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09), 0px 5px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  overflow: hidden;
  text-align: left;

  .clickableWrapper {
    display: grid;
    cursor: pointer;
    height: 100%;
  }

  :hover {
    box-shadow: 0px 2px 24px 0px #0000001a;
    .archiveButton {
      display: inline-block;
    }
  }

  .studyImage {
    height: 166px;
  }
  .noImage {
    background: lightgrey;
    height: 166px;
  }
  img {
    width: 100%;
    height: 166px;
    object-fit: cover;
  }
  .cardInfo {
    display: grid;
    align-items: start;
    align-content: start;
    padding: 16px;
    min-height: 314px;
    grid-template-rows: auto auto 1fr;
  }
  a {
    letter-spacing: 0.04em;
    text-decoration-line: underline;
    color: #007c70;
  }
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 30px;
    color: #1a1a1a;
  }
  p {
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
  }
  .cardBtn {
    margin-top: 24px;
    display: grid;
    align-self: end;
    button {
      background: #ffffff;
      color: #007c70;
      max-width: 150px;
      border-radius: 4px;
      cursor: pointer;
    }
    p {
      font-family: Lato;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0.05em;
      text-align: center;
    }
  }
`;

class StudyCard extends Component {
  render() {
    const { study } = this.props;

    return (
      <StyledStudyCard>
        <div
          className="clickableWrapper"
          onClick={() => {
            this.props.onSelectStudy(study);
          }}
        >
          <div className="studyImage">
            {study.image ? (
              <img src={study.image} alt={study.title} />
            ) : (
              <div className="noImage"></div>
            )}
          </div>

          <div className="cardInfo">
            <h2>{study.title}</h2>
            {ReactHtmlParser(study.shortDescription)}
          </div>
        </div>
      </StyledStudyCard>
    );
  }
}

export default StudyCard;
