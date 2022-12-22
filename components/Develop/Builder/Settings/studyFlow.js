import React, { Component } from 'react';
import { StyledStudyFlow } from './styles';

class StudyFlow extends Component {
  render() {
    const { study } = this.props;
    const blocks = study?.components?.blocks;

    return (
      <StyledStudyFlow>
        <h2>Study flow</h2>
        <p>
          {(!blocks || blocks?.length === 0) &&
            'No tests are found. Please save your study first.'}
        </p>
        {blocks.map(block => (
          <div className="block">
            <div className="blockHeader">
              <h2>{block?.title}</h2>
              <p>{block?.blockId}</p>
            </div>

            {block?.tests.map(test => (
              <div className="test">
                <div className="testHeader">
                  <span>{test?.title}</span>
                  <span>{test?.testId}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </StyledStudyFlow>
    );
  }
}

export default StudyFlow;
