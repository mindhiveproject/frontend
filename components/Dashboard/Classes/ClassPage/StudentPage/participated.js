import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const StyledStudiesHeader = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 200px 200px 2fr 1fr 1fr 1fr;
  padding: 10px;
  font-weight: bold;
  grid-gap: 1rem;
`;

const StyledClassRow = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: 200px 200px auto;
  background: white;
  grid-gap: 1rem;
  border-bottom: 1px solid lightGrey;
  .title {
    display: grid;
    grid-template-columns: 1fr;
    align-content: center;
    grid-gap: 1rem;
    align-content: baseline;
  }
  .conditionName {
    display: grid;
    align-content: baseline;
  }
  li {
    font-size: 1.3rem;
  }
`;

const TestInfoRow = styled.div`
  display: grid;
  padding: 0rem 1rem;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  align-items: center;
  background: ${props => (props.odd ? '#f0f0f0' : 'white')};
  border-radius: 5px;
  align-content: baseline;
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
          <div>Task ID</div>
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
          console.log('results', results);

          // populate tests with the information whether it was completed and completion date
          // const testsWithInfo = tests.map(test => {
          //   const testWithInfo = {
          //     ...test,
          //     status: results
          //       .filter(t => t.testVersion === test?.testId)
          //       .map(t => t.payload)[0],
          //     date: results
          //       .filter(t => t.testVersion === test?.testId)
          //       .map(t => t.createdAt)[0],
          //   };
          //   return testWithInfo;
          // });

          const resultsWithInfo = results
            .filter(result => result?.study?.id === study?.id)
            .map(result => {
              const resultExtended = {
                ...result,
                title:
                  tests
                    .filter(test => test?.testId === result?.testVersion)
                    .map(test => test?.title) || [],
              };
              return resultExtended;
            });

          console.log('resultsWithInfo', resultsWithInfo);

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
              <div className="conditionName">
                {blockName}

                <div>
                  {tests.map((test, num) => (
                    <li key={num}>{test?.title}</li>
                  ))}
                </div>
              </div>
              <div>
                {resultsWithInfo?.map((test, num) => (
                  <TestInfoRow key={num} odd={num % 2}>
                    <div>
                      {test?.title.map((title, num) => (
                        <span key={num}>{title} </span>
                      ))}
                    </div>
                    <div>{test?.testVersion}</div>

                    <div>
                      {test?.payload ? (
                        <>
                          {test?.payload === 'full'
                            ? '✅ Completed '
                            : '🔥 Started'}
                        </>
                      ) : (
                        '❌ Not done'
                      )}
                    </div>
                    <div>
                      {test?.createdAt ? (
                        moment(test?.createdAt).format('MM.D.YYYY, h:mma')
                      ) : (
                        <></>
                      )}
                    </div>
                  </TestInfoRow>
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
