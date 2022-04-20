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
  .testInfo {
    display: grid;
    grid-template-columns: 2fr auto auto;
    grid-gap: 1rem;
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
    const student = this.props?.student || {};
    const studies = student?.participantIn || [];

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
          <div>Tasks</div>
        </StyledStudiesHeader>

        {studies.map((study, num) => {
          const studyInfo = student?.studiesInfo[study?.id] || {};
          const blockId = studyInfo?.blockId || undefined;
          const studyBlock = study.components?.blocks.filter(
            block => block?.blockId === blockId
          )[0];
          const tests = studyBlock?.tests || [];
          const completedTests =
            student?.results?.filter(res => res.payload === 'full') || [];

          const testsWithInfo = tests.map(test => {
            const testWithInfo = {
              ...test,
              completed: completedTests
                .map(t => t.testVersion)
                .includes(test?.testId),
              date: completedTests
                .filter(t => t.testVersion === test?.testId)
                .map(t => t.createdAt)[0],
            };
            return testWithInfo;
          });

          return (
            <StyledClassRow key={num}>
              <div className="title">
                {study.title}
                <div>
                  <a
                    href={`https://mindhive.science/studies/${study.slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="external alternate" />
                  </a>
                </div>
              </div>
              <div>
                {testsWithInfo?.map((test, num) => (
                  <div className="testInfo" key={num}>
                    <div>{test?.title}</div>
                    <div>
                      {test?.completed ? 'Completed ✅' : 'Not completed ❌'}
                    </div>
                    <div>
                      {moment(test?.date).format('MMMM D, YYYY, h:mma')}
                    </div>
                  </div>
                ))}
              </div>
            </StyledClassRow>
          );
        })}
      </>
    );
  }
}

export default Participated;

// <div>{moment(study.createdAt).format('MMMM D, YYYY')}</div>
