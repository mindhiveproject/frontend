import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const StyledStudiesHeader = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 300px 150px 2fr 1fr 1fr 1fr;
  padding: 10px;
  font-weight: bold;
  grid-gap: 1rem;
`;

const StyledClassRow = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 300px 150px auto;
  background: white;
  grid-gap: 1rem;
  .title {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1rem;
    align-items: center;
  }
  .conditionName {
    display: grid;
    align-items: center;
  }
  .testInfo {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
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
          <div>Condition</div>
          <div>Task/survey/block</div>
          <div>ID</div>
          <div>Status</div>
          <div>Date</div>
        </StyledStudiesHeader>

        {studies.map((study, num) => {
          // get the information this student has regarding the study
          const studyInfo = student?.studiesInfo[study?.id] || {};

          // get the condition name
          const blockId = studyInfo?.blockId || undefined;
          // get the condition id
          const blockName = studyInfo?.blockName || undefined;

          let tests = [];
          // if the study has only one block (no between-subjects design), use that block
          if (
            study?.components?.blocks &&
            study?.components?.blocks.length === 1
          ) {
            tests = study?.components?.blocks[0].tests;
          } else {
            // get the study block which is equal to student condition id
            const studyBlock = study.components?.blocks.filter(
              block => block?.blockId === blockId
            )[0];
            // get the tests from this block
            tests = studyBlock?.tests || [];
          }

          // filter completed tasks
          // const completedTests = student?.results?.filter(res => res.payload === 'full') || [];
          const results = student?.results || [];

          // populate tests with the information whether it was completed and completion date
          const testsWithInfo = tests.map(test => {
            const testWithInfo = {
              ...test,
              status: results
                .filter(t => t.testVersion === test?.testId)
                .map(t => t.payload)[0],
              date: results
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
              <div className="conditionName">{blockName}</div>
              <div>
                {testsWithInfo?.map((test, num) => (
                  <div className="testInfo" key={num}>
                    <div>{test?.title}</div>
                    <div>{test?.testId}</div>

                    <div>
                      {test?.status ? (
                        <>
                          {test?.status === 'full'
                            ? '✅ Completed '
                            : '🔥 Started'}
                        </>
                      ) : (
                        '❌ Not done'
                      )}
                    </div>
                    <div>
                      {test?.date ? (
                        moment(test?.date).format('MM.D.YYYY, h:mma')
                      ) : (
                        <></>
                      )}
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
