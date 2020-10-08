import React, { Component } from 'react';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

import styled from 'styled-components';

const StyledStudyCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09), 0px 5px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  overflow: hidden;
  text-align: left;
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
      padding: 10px 25px 10px 25px;
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
        <div className="studyImage">
          {study.image ? (
            <img src={study.image} alt={study.title} />
          ) : (
            <div className="noImage"></div>
          )}
        </div>

        <div className="cardInfo">
          <h2>{study.title}</h2>
          <p>{ReactHtmlParser(study.description)}</p>
          <div className="cardBtn">
            <button
              onClick={() => {
                this.props.onSelectStudy(study);
              }}
            >
              <p>Select</p>
            </button>
          </div>
        </div>
      </StyledStudyCard>
    );
  }
}

export default StudyCard;
