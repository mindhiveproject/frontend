import React, { Component } from 'react';
import styled from 'styled-components';
import { Popup, Icon } from 'semantic-ui-react';
import { StyledParameterBlock } from '../styles';

import ArrayBuilder from './Builder/arrayBuilder';

const StyledSettingsBlock = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24px 1fr;
  grid-gap: 16px;
  justify-items: start;
  border-radius: 5px;
`;

class SettingBlock extends Component {
  render() {
    const { name, taskType } = this.props;
    if (name === 'mobileCompatible') {
      return (
        <StyledSettingsBlock key={name} htmlFor={name}>
          <div className="input" style={{ width: '50px' }}>
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={this.props.value}
              onChange={this.props.onChange}
            />
          </div>
          <div style={{ display: 'grid' }}>
            <label className="name" htmlFor={name}>
              {taskType} is mobile compatible
            </label>
          </div>
        </StyledSettingsBlock>
      );
    }
    if (name === 'duration') {
      return (
        <StyledParameterBlock key={name} htmlFor={name}>
          <div className="input">
            <label>Duration</label>
            <Popup
              content={
                <p>
                  Approximately how long will it take for someone to complete
                  the {taskType}?
                </p>
              }
              trigger={<Icon name="question circle outline" />}
            />
            <input
              type="text"
              id={name}
              name={name}
              value={this.props.value}
              onChange={this.props.onChange}
            />
          </div>
        </StyledParameterBlock>
      );
    }
    if (name === 'resources') {
      return (
        <StyledParameterBlock key={name} htmlFor={name}>
          <div className="input">
            <label>Resources</label>
            <ArrayBuilder
              name={name}
              content={this.props.value}
              onChange={this.props.onChange}
              title="Resource"
            />
          </div>
        </StyledParameterBlock>
      );
    }

    if (name === 'aggregateVariables') {
      return (
        <StyledParameterBlock key={name} htmlFor={name}>
          <div className="input">
            <label>Aggregate variables</label>
            <ArrayBuilder
              name={name}
              content={this.props.value}
              onChange={this.props.onChange}
              title="Variable"
            />
          </div>
        </StyledParameterBlock>
      );
    }
    return (
      <StyledParameterBlock key={name} htmlFor={name}>
        {name === 'descriptionBefore' && (
          <>
            <p>{taskType} card description (pre-participation)</p>
            <Popup
              content={
                <p>
                  This is what participants will see before taking the{' '}
                  {taskType}.
                </p>
              }
              trigger={<Icon name="question circle outline" />}
            />
          </>
        )}
        {name === 'descriptionAfter' && (
          <>
            <p>{taskType} card description (post-participation)</p>
            <Popup
              content={
                <p>
                  This is what participants will see after taking the {taskType}
                  .
                </p>
              }
              trigger={<Icon name="question circle outline" />}
            />
          </>
        )}
        {name === 'background' && (
          <>
            <p>Background</p>
            <Popup
              content="Use this field to provide some brief background on the topic of research. What is the problem under study and why is it important?"
              trigger={<Icon name="question circle outline" />}
            />
          </>
        )}
        {name === 'scoring' && <p>Instructions for scoring (for surveys)</p>}
        {name === 'format' && (
          <>
            <p>Format (for surveys)</p>
            <Popup
              content={
                <p>
                  For example:{' '}
                  <i>
                    10 questions in a 5-point Likert scale format. Questions
                    fall into 2 categories (negative and positive affect). 4 of
                    the questions are reverse-scored.
                  </i>
                </p>
              }
              trigger={<Icon name="question circle outline" />}
            />
          </>
        )}
        {name === 'addInfo' && <p>Additional Information</p>}
        <div className="input">
          <textarea
            id={name}
            name={name}
            value={this.props.value}
            onChange={this.props.onChange}
            rows="5"
          />
        </div>
        {name === 'descriptionBefore' && (
          <span>
            This is visible to anyone who hasn't yet participated in the task.
          </span>
        )}
        {name === 'descriptionAfter' && (
          <span>
            This is visible to anyone who has participated in the task.
          </span>
        )}
      </StyledParameterBlock>
    );
  }
}
export default SettingBlock;
