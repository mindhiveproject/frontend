import React, { useState } from 'react';
import { StyledSelectionScreen } from './styles';

const ActionSelector = ({
  returnToStage,
  onClose,
  handleActionChoice,
  title,
  options,
}) => (
  <StyledSelectionScreen>
    <div className="selectionHeader">
      <div className="goBackBtn">
        <span onClick={() => returnToStage('selection-first-question')}>
          ← Go back to previous step
        </span>
      </div>
      <div className="closeBtn">
        <span onClick={onClose}>&times;</span>
      </div>
    </div>

    <div className="selectionBody">
      <div>
        <h1>{title}</h1>
      </div>

      <div className="studyOptions">
        {options.map(option => (
          <div
            key={option.action}
            className="option"
            onClick={() => handleActionChoice(option.action)}
          >
            <div className="iconSelect">
              <img src={option.icon} alt="icon" width="50" />
            </div>
            <h3>{option.header}</h3>
            <p>{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  </StyledSelectionScreen>
);

export default ActionSelector;
