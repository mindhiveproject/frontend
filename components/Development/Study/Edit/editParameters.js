import React, { Component } from 'react';
import styled from 'styled-components';
import ParameterBlock from './parameterBlock';
import SettingsBlock from './settingBlock';

const StyledSettingsList = styled.div`
  display: grid;
  grid-gap: 18px;
  margin-top: 30px;
`;

class EditParameters extends Component {
  render() {
    const { study } = this.props;

    const studyThankYouMessageBlock = study.info.filter(
      el => el.name === 'thankYouMessage'
    );
    const thankYouMessageBlock = studyThankYouMessageBlock.length
      ? studyThankYouMessageBlock
      : [{ name: 'thankYouMessage' }];

    return (
      <div>
        {thankYouMessageBlock.map((block, i) => (
          <ParameterBlock
            key={i}
            block={block}
            handleParameterChange={this.props.handleParameterChange}
          />
        ))}

        <StyledSettingsList>
          {Object.keys(study.settings).map((name, i) => (
            <SettingsBlock
              key={i}
              name={name}
              value={study.settings[name]}
              handleSettingsChange={this.props.handleSettingsChange}
            />
          ))}
        </StyledSettingsList>
      </div>
    );
  }
}

export default EditParameters;
